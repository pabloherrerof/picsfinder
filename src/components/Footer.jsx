import "./footer.css";
export const Footer = () => {
  return (
    <div className="footer">
      <h2>PicFinder</h2>
      <p>
        ©{" "}
        <a
          href="https://github.com/pabloherrerof"
          target="_blank"
          rel="noreferrer"
        >
          Pablo Herrero.
        </a>{" "}
        All rights reserved
      </p>
    </div>
  );
};
