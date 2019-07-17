import React from "react";

const RepoItems = ({ repo }) => {
  return (
    <div className="badgerepo">
      <a href={repo.html_url}>{repo.name}</a>
    </div>
  );
};

export default RepoItems;
