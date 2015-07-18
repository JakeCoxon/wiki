import React from 'react'

export default React.createClass({

    getInitialState() {
        return { editing: false, editingBody: "", editingTitle: "" };
    },

    onEdit() {
        this.setState({ editing: true, editingBody: this.props.body, editingTitle: this.props.title });
    },

    onDone() {
        this.setState({ editing: false });
        this.props.onDone({ title: this.state.editingTitle, body: this.state.editingBody })
    },

    onDelete() {
        this.props.onDelete();
    },

    onCancel() {
        this.setState({ editing: false });
    },

    onBodyChange(event) {
        this.setState({ editingBody: event.target.value });
    },

    onTitleChange(event) {
        this.setState({ editingTitle: event.target.value });
    },

    render() {
        if (this.state.editing) return this.renderEditing();

        const { title, body, onClose } = this.props;

        return (
            <div className="docview">
                <div className="docview-menu">
                    <div className="docview-menu-title">
                        <div className="docview-menu-title-text">{ title }</div>
                    </div>
                    <div className="docview-menu-right">
                        <button className="button" onClick={ this.onEdit }>Edit</button>
                        <button className="button" onClick={ this.props.onClose }>Close</button>
                    </div>
                </div>
                <div className="docview-body">{ body }</div>
            </div>
        );
    },

    renderEditing() {

        const { title } = this.props;
        const { editingBody, editingTitle } = this.state;

        return (
            <div className="docview">
                <div className="docview-menu">
                    <div className="docview-menu-title">
                        <input className="docview-menu-title-input" type="text" value={ editingTitle } onChange={this.onTitleChange} />
                    </div>
                    <div className="docview-menu-right">
                        <button className="button" onClick={ this.onDelete }>Delete</button>
                        <button className="button" onClick={ this.onCancel }>Cancel</button>
                        <button className="button" onClick={ this.onDone }>Done</button>
                    </div>
                </div>
                <div>
                    <textarea className="docview-bodyedit" value={ editingBody } onChange={this.onBodyChange} />
                </div>
            </div>
        )
    }

})