export default function Card({
  name,
  position,
  aboutMe,
  profileImage,
}) {
  return (
    <div className="container">
      <div className="card-container">
        <div className="descripcion">
          <h1>{name}</h1>
          <h2>{position}</h2>
          <p>{aboutMe}</p>
          {/* <div className="icons">
            <a href={linkedin} className="hover-text" target="_blank">
              <span className="tooltip-text" id="fade">
                LinkedIn
              </span>
              <i className="bi bi-linkedin"></i>
            </a>
            <a href={github} className="hover-text" target="_blank">
              <span className="tooltip-text" id="fade">
                GitHub
              </span>
              <i className="bi bi-github"></i>
            </a>
            <a href={cvLink} className="hover-text" target="_blank">
              <span className="tooltip-text" id="fade">
                Curriculo
              </span>
              <i className="bi bi-file-earmark-arrow-down"></i>
            </a>
          </div> */}
        </div>
        <div className="image">
          <img src={profileImage} alt="" />
        </div>
      </div>
    </div>
  );
}
