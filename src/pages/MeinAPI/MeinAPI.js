import './index.scss';
import { useEffect, useState } from 'react';
import axios from 'axios';
function MeinAPI() {
  const [username, setUsername] = useState('');
  const [loading, setLoading] = useState(false);
  const [fault, setFault] = useState(false);
  const [repos, setRepos] = useState([]);

  useEffect(() => {
    setRepos([]);
    setFault(false);
  }, [username]);

  function handleSubmit(e) {
    e.preventDefault();
    searchRepos();
  }
  function searchRepos() {
    setLoading(true);
    axios({
      method: 'get',
      url: `https://api.github.com/users/${username}/repos`,
    })
      .then((response) => {
        setLoading(false);
        setRepos(response.data);
      })
      .catch((error) => {
        setFault(true);
        console.log(error);
      });
  }

  function renderRepo(item) {
    return (
      <a
        href={`https://github.com/${item.full_name}`}
        target={'_blank'}
        rel="noreferrer"
        key={item.id}
      >
        <div className="row-conteiner">
          <p className="text-p">name: {item.name}</p>
          <p className="text-p">forks count: {item.forks_count}</p>
          <p className="text-p">language: {item.language}</p>
          <p className="text-p">size: {item.size}</p>
        </div>
      </a>
    );
  }

  return (
    <div className="page">
      <div className="landing-page-container">
        <form className="form">
          <input
            className="input"
            value={username}
            placeholder="username"
            onChange={(e) => setUsername(e.target.value)}
          />
          <button className="button btn" onClick={handleSubmit}>
            {loading ? 'searching...' : 'search'}
          </button>
        </form>
        <div className="results-conteiner">
          {fault ? (
            <div className="fault-conteiner">status code 404</div>
          ) : loading ? (
            <div className="loader">Загрузка...</div>
          ) : (
            repos.map(renderRepo)
          )}
        </div>
      </div>
    </div>
  );
}

export default MeinAPI;
