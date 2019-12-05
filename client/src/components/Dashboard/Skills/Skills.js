import React from "react";





const Skills = props => {

  let items;
  if (props.skills.length>0) {
    items = props.skills.map(skill => <li>{skill}</li>);
  }

  return (
    <div>
      <ul>{items}</ul>
      <form>
        <div className="form-group">
          <input
            type="text"
            placeholder="Name"
            name="text"
          />
        </div>
        <input type="submit" className="btn btn-primary" value="Login" />
      </form>
    </div>
  );
};

export default Skills;
