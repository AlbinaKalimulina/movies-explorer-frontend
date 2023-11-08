import { Link, useNavigate } from "react-router-dom";

function PageNotFound() {
  const navigate = useNavigate()
  return (
    <main className="main">
      <section className="not-found">
        <h1 className="not-found__title">404</h1>
        <p className="not-found__subtitle">Страница не найдена</p>
        <Link to="#" onClick={() => navigate(-1)} className="not-found__link">
          Назад
        </Link>
      </section>
    </main>
  );
}

export default PageNotFound;