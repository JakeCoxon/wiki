import React from 'react'
import CodeMirror from 'codemirror'
require('codemirror/mode/gfm/gfm.js')
require("codemirror/addon/edit/continuelist.js");

export default React.createClass({



    componentDidMount() {
        const textarea = this.refs.textarea

        const editor = this.editor = CodeMirror.fromTextArea(textarea, {
            mode: "gfm",
            theme: "",
            lineWrapping: true,
            viewportMargin: Infinity,
            ...this.props
        });
        editor.getDoc().setValue(this.props.initialValue);
        editor.on('change', this.handleChange);
    },

    getValue() {
        return this.editor.getValue();
    },


    handleChange() {
        this.props.onChange && this.props.onChange(this.getValue());
    },


    render() {
        return <div className="editorcontainer"><textarea ref="textarea"></textarea></div>
    }


})