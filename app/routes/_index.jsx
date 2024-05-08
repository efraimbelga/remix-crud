import React from "react";

export async function loader({ request }) {
  // return getProjects();
  return null;
}

export async function action({ request }) {
  //   const form = await request.formData();
  //   return createProject({ title: form.get("title") });
}

const _index = () => {
  return (
    <div className="row">
      <div className="col-sm-4">
        <h3>Column 1</h3>
        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit...</p>
        <p>
          Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris...
        </p>
      </div>
      <div className="col-sm-4">
        <h3>Column 2</h3>
        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit...</p>
        <p>
          Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris...
        </p>
      </div>
      <div className="col-sm-4">
        <h3>Column 3</h3>
        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit...</p>
        <p>
          Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris...
        </p>
      </div>
    </div>
  );
};

export default _index;
