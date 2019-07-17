import React from "react";
import RepoItems from "./RepoItems";

const Users = ({ repos }) => {
  return repos.map(repo => <RepoItems repo={repo} key={repo.id} />);
};

export default Users;
