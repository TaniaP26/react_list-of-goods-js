import 'bulma/css/bulma.css';
import './App.scss';

import { useState } from 'react';
import classNames from 'classnames';

export const goodsFromServer = [
  'Dumplings',
  'Carrot',
  'Eggs',
  'Ice cream',
  'Apple',
  'Bread',
  'Fish',
  'Honey',
  'Jam',
  'Garlic',
];

export const Goods = ({ goods }) => (
  <ul>
    {goods.map(good => (
      <li key={good} data-cy="Good">
        {good}
      </li>
    ))}
  </ul>
);

export const App = () => {
  // const [sortField, setSortField] = useState(goodsFromServer);
  const [sortField, setSortField] = useState('');
  const [reversed, setReversed] = useState(false);

  const visibleGoods = (() => {
    let goods = [...goodsFromServer];

    // Сортування
    if (sortField === 'length') {
      goods.sort((a, b) => a.length - b.length);
    } else if (sortField === 'alphabeticaly') {
      goods.sort((a, b) => a.localeCompare(b));
    }

    // Reset
    if (sortField === 'reset') {
      goods = [...goodsFromServer];
    }

    // Перевернути масив, якщо активне
    if (reversed) {
      goods.reverse();
    }

    return goods;
  })();

  return (
    <div className="section content">
      <div>Sort by:</div>

      <div className="buttons">
        <button
          type="button"
          onClick={() => setSortField('alphabeticaly')}
          className={classNames('button is-info', {
            'is-light': sortField !== 'alphabeticaly',
          })}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          onClick={() => setSortField('length')}
          className={classNames('button is-success', {
            'is-light': sortField !== 'length',
          })}
        >
          Sort by length
        </button>

        <button
          type="button"
          onClick={() => setReversed(prev => !prev)}
          className={classNames('button is-warning', {
            'is-light': !reversed,
          })}
        >
          Reverse
        </button>

        {(sortField || reversed) && (
          <button
            type="button"
            onClick={() => {
              setSortField('');
              setReversed(false);
            }}
            className="button is-danger is-light"
          >
            Reset
          </button>
        )}
      </div>

      <Goods goods={visibleGoods} />
    </div>
  );
};
