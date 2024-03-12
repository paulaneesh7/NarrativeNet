import { Link } from "react-router-dom";

const currentYear = new Date().getFullYear();

const Footer = () => {
  return (
    <>
      <div className="px-8 md:px-[100px] lg:px-[100px] mt-8">
        <hr />
        <div className="mt-4 mb-4 text-sm ">
          <div className="flex justify-between">
            <p> &copy; {currentYear} | All rights reserved</p>
            <div className="flex items-center justify-center gap-4 cursor-pointer">
              <Link to="https://github.com/paulaneesh7" target="_blank">
                <p className="hover:underline">GitHub</p>
              </Link>
              <Link to="mailto:aneesh16117@gmail.com" target="_blank">
                <p className="hover:underline">Mail</p>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Footer;
