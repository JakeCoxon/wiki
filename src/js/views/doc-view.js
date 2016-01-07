import React from 'react'
import Editor from './editor-view.js'
import bodyRenderer from '../util/bodyRenderer.js'

// import CommandStore from '../stores/command-store.js'

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

    onBodyChange(value) {
        this.setState({ editingBody: value });
    },

    onTitleChange(event) {
        this.setState({ editingTitle: event.target.value });
    },

    onMore(ev) {
        // CommandStore.show([
        //     { label: "Delete", callback: this.onDelete }, 
        //     { label: "Duplicate", callback: () => null }, 
        //     { label: "Revert changes", callback: this.onCancel },
        //     { label: "Save changes", callback: this.onDone },
        // ], ev.currentTarget);
    },

    render() {
        if (this.state.editing) return this.renderEditing();

        const { title, body, onClose } = this.props;

        if (body != this.cachedBody) {
            this.cachedBody = body;
            this.cachedRender = bodyRenderer(body);
        }

        const renderedBody = this.cachedRender;

        return (
            <div className="docview">
                <div className="docview-menu">
                    <div className="docview-menu-title">
                        <div className="docview-menu-title-text">{ title }</div>
                    </div>
                    <div className="docview-menu-right">
                        <div className="iconbutton" onClick={ this.onEdit }><i className="fa fa-pencil"></i></div>
                        <div className="iconbutton" onClick={ this.props.onClose }><i className="fa fa-close"></i></div>
                    </div>
                </div>
                <div className="docview-body">
                    <RenderedBodyWithDocumentLinks 
                        bodyHtml={renderedBody} 
                        onOpenDocument={this.props.onOpenDocument} />
                </div>
            </div>
        );
    },

    renderEditing() {

        const { title } = this.props;
        const { editingBody, editingTitle } = this.state;

        return (
            <div className="docview is-editing">
                <div className="docview-menu">
                    <div className="docview-menu-title">
                        <input className="docview-menu-title-input" type="text" value={ editingTitle } onChange={this.onTitleChange} />
                    </div>
                    <div className="docview-menu-right">
                        <div className="iconbutton" onClick={ this.onMore }><i className="fa fa-ellipsis-h"></i></div>
                        <div className="iconbutton" onClick={ this.onDone }><i className="fa fa-check"></i></div>
                    </div>
                </div>
                <div className="docview-body">

                    <Editor initialValue={editingBody} onChange={this.onBodyChange} />
                    {/*<textarea className="docview-bodyedit" value={ editingBody } onChange={this.onBodyChange} />*/}
                </div>
            </div>
        )
    }

})

const RenderedBodyWithDocumentLinks = React.createClass({
    
    componentWillMount() {
        this.unsubscribes = [];
    },

    componentDidMount() {
        this.componentDidUpdate();
    },

    componentDidUpdate() {
        this.unsubscribes.forEach(f => f());
        this.unsubscribes.length = 0;

        [...this.refs.body.querySelectorAll('a')].forEach(anchor => {
            const href = anchor.getAttribute('href');
            if (href.charAt(0) == '/') {
                const handler = (ev) => {
                    ev.preventDefault();
                    this.props.onOpenDocument && this.props.onOpenDocument(href.substring(1));
                }
                anchor.addEventListener('click', handler);
                this.unsubscribes.push(() => anchor.removeEventListener('click', handler));
            }
        });

        // Hack to trigger mutation observer when images have loaded.
        [...this.refs.body.querySelectorAll('img')].forEach(image => {
            const handler = () => { 
                image.style.height = image.clientHeight + "px" 
            };
            image.addEventListener('load', handler);
            this.unsubscribes.push(() => image.removeEventListener('load', handler));
        });


    },

    render() {
        return <div ref="body" dangerouslySetInnerHTML={{ __html: this.props.bodyHtml }}></div>
    }
})