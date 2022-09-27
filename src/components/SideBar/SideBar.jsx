import React from "react";
import { useContext } from "react";
import { Link, NavLink } from "react-router-dom";
import { AppContext } from "../../app.context";
import { isTrueSet } from "../../utils/constant";
import { ROUTES } from "../../utils/routes";

const IS_SUSPENSE = isTrueSet(process.env.REACT_APP_QUERY_SUSPENSE);

export const SideBar = () => {
  const { fetchType } = useContext(AppContext);

  const getFetchType = (fetchType) => {
    const { Cache, Stale, Refetch } = fetchType;

    if (Cache) {
      return "Cache";
    } else if (Stale) {
      return "Stale";
    } else if (Refetch) {
      return "Refetch";
    } else {
      return "";
    }
  };
  return (
    <div className="list-group">
      <Link className={`list-group-item list-group-item-action`} to={"/"}>
        HOME
      </Link>
      <NavLink
        className={({ isActive }) =>
          ` ${isActive ? "active" : ""} ${
            IS_SUSPENSE ? "disabled" : ""
          } list-group-item list-group-item-action`
        }
        role="button"
        to={`/${ROUTES.FETCHING}`}
      >
        {ROUTES.FETCHING.toUpperCase()}
      </NavLink>
      <NavLink
        className={({ isActive }) =>
          ` ${isActive ? "active" : ""} ${
            IS_SUSPENSE ? "disabled" : ""
          } list-group-item list-group-item-action`
        }
        role="button"
        to={`/${ROUTES.CACHING}?fetchType=${getFetchType(fetchType)}`}
      >
        {ROUTES.CACHING.toUpperCase()}
      </NavLink>
      <NavLink
        className={({ isActive }) =>
          ` ${isActive ? "active" : ""} ${
            IS_SUSPENSE ? "disabled" : ""
          } list-group-item list-group-item-action`
        }
        rol="button"
        to={`/${ROUTES.POLLING}`}
      >
        {ROUTES.POLLING.toUpperCase()}
      </NavLink>
      <NavLink
        className={({ isActive }) =>
          ` ${isActive ? "active" : ""} ${
            IS_SUSPENSE ? "disabled" : ""
          } list-group-item list-group-item-action`
        }
        role="button"
        to={`/${ROUTES.MUTATION}`}
      >
        {ROUTES.MUTATION.toUpperCase()}
      </NavLink>
      <NavLink
        className={({ isActive }) =>
          ` ${isActive ? "active" : ""} ${
            IS_SUSPENSE ? "disabled" : ""
          } list-group-item list-group-item-action`
        }
        role="button"
        to={`/${ROUTES.PAGINATION}`}
      >
        {ROUTES.PAGINATION.toUpperCase()}
      </NavLink>
      <NavLink
        className={({ isActive }) =>
          ` ${isActive ? "active" : ""} ${
            IS_SUSPENSE ? "disabled" : ""
          } list-group-item list-group-item-action`
        }
        role="button"
        to={`/${ROUTES.INFINITE}`}
      >
        {ROUTES.INFINITE.toUpperCase()}
      </NavLink>
      <NavLink
        className={({ isActive }) =>
          ` ${isActive ? "active" : ""} ${
            !IS_SUSPENSE ? "disabled" : ""
          } list-group-item list-group-item-action`
        }
        role="button"
        to={`/${ROUTES.SUSPENSE}`}
      >
        {ROUTES.SUSPENSE.toUpperCase()}
      </NavLink>
    </div>
  );
};
