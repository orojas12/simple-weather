import React from "react";
import {
  NavLink,
  useNavigate,
  useRouteError,
  isRouteErrorResponse,
} from "react-router-dom";
import "./error.css";

export function UnexpectedError() {
  const navigate = useNavigate();

  return (
    <article className="error">
      <h1>Oops!</h1>
      <h2>Sorry, an unexpected error has occurred.</h2>
      <a onClick={() => navigate(0)}>Reload page</a>
    </article>
  );
}

export function NotFound() {
  return (
    <article className="error">
      <h1>404</h1>
      <h2>This page does not exist.</h2>
      <NavLink to="/">Return to dashboard</NavLink>
    </article>
  );
}

export function ErrorBoundary() {
  const error = useRouteError();

  if (isRouteErrorResponse(error) && error.status === 404) {
    return <NotFound />;
  } else {
    // log error to a service here
    return <UnexpectedError />;
  }
}
