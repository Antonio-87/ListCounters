import formatDate from '../functions/formatDate';
import HVS from '../assets/hvs.svg';
import GVS from '../assets/gvs.svg';
import deleteDefoult from '../assets/deleteDefoult.svg';
import deleteHover from '../assets/deleteHover.svg';
import useStore from '../hooks/useContext';
import { useState } from 'react';

const MetersList = () => {
  const { meters } = useStore();
  const [hoverDelete, setHoverDelete] = useState<boolean>(false);
  const [hoveredRowId, setHoveredRowId] = useState<string | null>(null);

  let startCount = meters.currentPage * 20 - 19;

  let buttons = [];

  if (meters.totalPages <= 6) {
    buttons = Array.from({ length: meters.totalPages }, (_, i) => i + 1);
  } else {
    buttons = [1, 2, 3];
    buttons.push(0);
    buttons = buttons.concat(
      Array.from({ length: 3 }, (_, i) => meters.totalPages - 2 + i)
    );
  }

  return (
    <div>
      <header>
        <h1>Список счетчиков</h1>
      </header>
      <main>
        <table>
          <thead>
            <tr>
              <th>№</th>
              <th>Тип</th>
              <th>Дата установки</th>
              <th>Автоматический</th>
              <th>Текущие показания</th>
              <th>Адрес</th>
              <th>Примечание</th>
            </tr>
          </thead>
          <tbody>
            {meters.meters &&
              meters.meters.map((meter) => {
                return (
                  <tr
                    key={meter.id}
                    onMouseEnter={() => {
                      setHoveredRowId(meter.id);
                    }}
                    onMouseLeave={() => {
                      setHoveredRowId(null);
                    }}
                  >
                    <td>{startCount++}</td>
                    {meter._type[0] === 'ColdWaterAreaMeter' ? (
                      <td>
                        <img src={GVS} alt="ГВС" />
                      </td>
                    ) : (
                      <td>
                        <img src={HVS} alt="ГВС" />
                      </td>
                    )}
                    <td>{formatDate(meter.installation_date)}</td>
                    <td>{meter.is_automatic ? 'да' : 'нет'}</td>
                    <td>{meter.initial_values[0].toFixed(4)}</td>
                    <td>{meter.address}</td>
                    <td>{meter.description}</td>
                    <td>
                      {hoveredRowId === meter.id && (
                        <img
                          src={hoverDelete ? deleteHover : deleteDefoult}
                          onClick={() => meters.deleteMeter(meter.id)}
                          onMouseEnter={() => {
                            setHoverDelete(true);
                          }}
                          onMouseLeave={() => {
                            setHoverDelete(false);
                          }}
                          alt="Delete"
                        />
                      )}
                    </td>
                  </tr>
                );
              })}
          </tbody>
        </table>
      </main>
    </div>
  );
};

export default MetersList;