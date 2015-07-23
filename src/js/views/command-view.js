import React from 'react'
import cx from '../util/mergeClasses.js'

import CommandStore from '../stores/command-store.js'
import StoreAdapter from '../util/store-adapter.js'

import fuzzy from '../../lib/fuzzy.js'

const CommandView = React.createClass({

    getInitialState() {
        return { filter: "", filteredCommands: this.applyFilter(""), selected: 0 }
    },

    componentDidMount() {
        this.refs.input.getDOMNode().focus();
    },

    onKeyDown(ev) {
        const direction = (ev.which === 40) - (ev.which === 38);

        if (direction !== 0) {
            const newSelected = Math.min(Math.max(this.state.selected + direction, 0), this.state.filteredCommands.length-1);
            this.setState({ selected: newSelected })
        }
        else if (ev.which === 13) {
            this.applyCommand();
            this.onClose();
        }
        else if (ev.which === 27) {
            this.onClose();
        }
        else {
        }


    },

    applyCommand() {
        const command = this.state.filteredCommands[this.state.selected];
        command.original.callback();
    },

    onMouseOver(index) {
        return () => this.setState({ selected: index });
    },

    onClick(index) {
        return () => {
            this.setState({ selected: index });
            this.applyCommand();
            this.onClose();
        };
    },

    onBlur(ev) {
        ev.target.focus();
    },

    onOverlayClick() {
        this.onClose();
    },

    onClose() {
        CommandStore.hide();
    },

    applyFilter(filter) {
        return fuzzy.filter(filter, this.props.commands, {
            extract: command => command.label
        });
    },

    onFilterChange(ev) {

        const filter = ev.target.value;

        const matches = this.applyFilter(filter)
        console.log(matches);

        this.setState({ filter: filter, selected: 0, filteredCommands: matches });
    },

    render() {



        const style = {
            position: 'absolute',
            left: this.props.targetRect.left,
            top: this.props.targetRect.top + this.props.targetRect.height
        };

        return (
            <div className="modal">
                <div className="modal-overlay" onClick={this.onOverlayClick}></div>
                <div className="commandpalette" style={style}>
                    <input className="commandpalette-input"
                           value={this.state.filter}
                           ref="input"
                           type="text" 
                           onChange={this.onFilterChange}
                           onKeyDown={this.onKeyDown} 
                           onBlur={this.onBlur} />
                    {
                        this.state.filteredCommands.map((command, index) => {

                            const isSelected = index === this.state.selected;
                            const label = command.matches.map((string, index) =>
                                index % 2 === 1 ? <strong style={{textDecoration:'underline'}}>{string}</strong> : string);


                            return (
                                <div className={cx("commandpalette-command", isSelected && "is-selected")}
                                     onMouseOver={this.onMouseOver(index)}
                                     onClick={this.onClick(index)}>
                                        { label }
                                </div>
                            );
                        })
                    }
                </div>
            </div>
        );
    }

})

const CommandViewAdapter = CommandView.Adapter = React.createClass({
    render() {
        return (
            <StoreAdapter stores={[CommandStore]}>
                {state =>
                    <div>
                        {state.commands.length > 0 && <CommandView commands={state.commands} targetRect={state.targetRect} />}
                    </div>
                }
            </StoreAdapter>
        );
    }
})

export default CommandView;