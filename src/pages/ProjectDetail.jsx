import React from 'react';
import { useParams } from 'react-router-dom';

const ProjectDetail = () => {
  const { id } = useParams();
  
  return (
    <div className="page-wrapper section-padding">
      <div className="container">
        <h1 className="heading-lg">Project {id}</h1>
      </div>
    </div>
  );
};

export default ProjectDetail;
