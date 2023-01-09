import { Link } from "react-router-dom";

export const Page = (attrs: {
  title: string;
  children: JSX.Element | string;
}) => {
  document.title = attrs.title;
  return (
    <div>
      <nav>
        <ul>
          <li>
            <Link to="/">Main</Link>
          </li>
        </ul>
      </nav>
      <div>{attrs.children}</div>
    </div>
  );
};
