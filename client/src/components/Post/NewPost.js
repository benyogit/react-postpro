import React, { Component } from "react";
import { Link, Redirect } from "react-router-dom";
import { addPost } from "../../store/actions/index.js";
import { connect } from "react-redux";
import {
  Editor,
  EditorState,
  RichUtils,
  convertToRaw,
  convertFromRaw,
  getDefaultKeyBinding
} from "draft-js";
import Spiner from "../UI/spiner.js";
import style from "./NewPost.css";

class NewPost extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "",
      text: "",
      isFull: false,
      editorState: EditorState.createEmpty()
    };

    this.focus = () => this.refs.editor.focus();
    this.onChange = editorState => this.setState({ editorState });
    this.handleKeyCommand = this._handleKeyCommand.bind(this);
    this.mapKeyToEditorCommand = this._mapKeyToEditorCommand.bind(this);
    this.toggleBlockType = this._toggleBlockType.bind(this);
    this.toggleInlineStyle = this._toggleInlineStyle.bind(this);
  }

  _handleKeyCommand(command, editorState) {
    const newState = RichUtils.handleKeyCommand(editorState, command);
    if (newState) {
      this.onChange(newState);
      return true;
    }
    return false;
  }
  _mapKeyToEditorCommand(e) {
    if (e.keyCode === 9 /* TAB */) {
      const newEditorState = RichUtils.onTab(
        e,
        this.state.editorState,
        4 /* maxDepth */
      );
      if (newEditorState !== this.state.editorState) {
        this.onChange(newEditorState);
      }
      return;
    }
    return getDefaultKeyBinding(e);
  }
  _toggleBlockType(blockType) {
    this.onChange(RichUtils.toggleBlockType(this.state.editorState, blockType));
  }
  _toggleInlineStyle(inlineStyle) {
    this.onChange(
      RichUtils.toggleInlineStyle(this.state.editorState, inlineStyle)
    );
  }

  onTitleChange = e => {
    e.preventDefault();

    this.setState({ ...this.state, [e.target.name]: e.target.value });
  };
  onSubmit = e => {
    e.preventDefault();

    if (this.state.title.length > 0) {
      /* && rawString.length > 0) {*/
      console.log("in raw string");
      this.props.onAddPost(
        this.state.title,
        JSON.stringify(convertToRaw(this.state.editorState.getCurrentContent()))
      );
      this.setState({ ...this.state, isFull: true });
    }
  };
  render() {
    const { editorState } = this.state;
    // If the user changes block type before entering any text, we can
    // either style the placeholder or hide it. Let's just hide it now.
    let className = "RichEditor-editor";
    var contentState = editorState.getCurrentContent();
    if (!contentState.hasText()) {
      if (
        contentState
          .getBlockMap()
          .first()
          .getType() !== "unstyled"
      ) {
        className += " RichEditor-hidePlaceholder";
      }
    }

    if (this.props.isLoading) {
      return <Spiner />;
    } else if (!this.state.isFull) {
      return (
        <div className="post-form">
          
          <h1 className="large text-primary">Write Something</h1>
          <form className="form my-1" onSubmit={e => this.onSubmit(e)}>
            <input
              type="text"
              name="title"
              value={this.state.title}
              placeholder="Set Title"
              onChange={e => this.onTitleChange(e)}
            />
             <div className="form-group">
              <label for="exampleFormControlFile1">Example file input</label>
              <input type="file" className="form-control-file" id="exampleFormControlFile1"/>
             </div>
            <BlockStyleControls
              editorState={editorState}
              onToggle={this.toggleBlockType}
            />
            <InlineStyleControls
              editorState={editorState}
              onToggle={this.toggleInlineStyle}
            />

            <div className={className} onClick={this.focus}>
              <Editor
                blockStyleFn={getBlockStyle}
                customStyleMap={styleMap}
                editorState={editorState}
                handleKeyCommand={this.handleKeyCommand}
                keyBindingFn={this.mapKeyToEditorCommand}
                onChange={this.onChange}
                ref="editor"
                spellCheck={true}
              />
            </div>

            <input type="submit" className="btn btn-dark my-1" value="Submit" />
          </form>
        </div>
      );
    } else {
      return <Redirect to="/posts" />;
    }
  }
}

// Custom overrides for "code" style.
const styleMap = {
  CODE: {
    backgroundColor: "rgba(0, 0, 0, 0.05)",
    fontFamily: '"Inconsolata", "Menlo", "Consolas", monospace',
    fontSize: 16,
    padding: 2
  }
};
function getBlockStyle(block) {
  switch (block.getType()) {
    case "blockquote":
      return "RichEditor-blockquote";
    case "Monospace":
      return "RichEditor-CODE";
    default:
      return null;
  }
}
class StyleButton extends React.Component {
  constructor() {
    super();
    this.onToggle = e => {
      e.preventDefault();
      this.props.onToggle(this.props.style);
    };
  }
  render() {
    let className = "RichEditor-styleButton";
    if (this.props.active) {
      className += " RichEditor-activeButton";
    }
    return (
      <span className={className} onMouseDown={this.onToggle}>
        {this.props.label}
      </span>
    );
  }
}
const BLOCK_TYPES = [
  { label: "H1", style: "header-one" },
  { label: "H2", style: "header-two" },
  { label: "H3", style: "header-three" },
  { label: "H4", style: "header-four" },
  { label: "H5", style: "header-five" },
  { label: "H6", style: "header-six" },
  { label: "Blockquote", style: "blockquote" },
  { label: "UL", style: "unordered-list-item" },
  { label: "OL", style: "ordered-list-item" },
  { label: "Code Block", style: "code-block" }
];
const BlockStyleControls = props => {
  const { editorState } = props;
  const selection = editorState.getSelection();
  const blockType = editorState
    .getCurrentContent()
    .getBlockForKey(selection.getStartKey())
    .getType();
  return (
    <div className="RichEditor-controls">
      {BLOCK_TYPES.map(type => (
        <StyleButton
          key={type.label}
          active={type.style === blockType}
          label={type.label}
          onToggle={props.onToggle}
          style={type.style}
        />
      ))}
    </div>
  );
};
var INLINE_STYLES = [
  { label: "Bold", style: "BOLD" },
  { label: "Italic", style: "ITALIC" },
  { label: "Underline", style: "UNDERLINE" },
  { label: "Monospace", style: "CODE" }
];
const InlineStyleControls = props => {
  const currentStyle = props.editorState.getCurrentInlineStyle();

  return (
    <div className="RichEditor-controls">
      {INLINE_STYLES.map(type => (
        <StyleButton
          key={type.label}
          active={currentStyle.has(type.style)}
          label={type.label}
          onToggle={props.onToggle}
          style={type.style}
        />
      ))}
    </div>
  );
};

const mapStateToProps = state => {
  return {
    isAuthenticated: state.auth.authenticated,
    isLoading: state.posts.loading,
    errorMessage: state.auth.message
  };
};

const mapsDispatchToProps = dispatch => {
  return {
    onAddPost: (title, text) => dispatch(addPost(title, text))
  };
};

export default connect(
  mapStateToProps,
  mapsDispatchToProps
)(NewPost);
