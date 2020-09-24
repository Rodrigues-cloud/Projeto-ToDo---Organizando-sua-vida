import React, { useEffect, useState} from 'react';
import * as S from './styles';
import { Link } from 'react-router-dom';


import logo from '../../assets/logo.png';
import bell from '../../assets/bell.png';

import api from '../../services/api';
import isConnected from '../../utils/isConnected';

function Header({ clickNotification }) {
  const [lateCount, setLateCount] = useState();

  async function lateVerify(){
    await api.get(`/task/filter/late/11:11:11:11:11:11`)
    .then(response => {
      setLateCount(response.data.length)
    })
  }

  useEffect(() => {
    lateVerify();
  })

  async function Logout(){
    localStorage.removeItem('@todo/macaddress');
      window.location.reload();
  }

  return (
    <S.Container>
      <S.leftSide>
        <img src={logo} alt="Logo" />
      </S.leftSide>
      <S.RightSide>
        <Link to="/">INÍCIO</Link>
        <span className="dividir" />
        <Link to="/task">NOVA TAREFA</Link>
        <span className="dividir" />
        {  ! isConnected ?
        <Link to="/qrcode">SINCRONIZAR CELULAR</Link>
        :
        <button type="button" onClick={Logout}>SAIR</button>
        }

        {
          lateCount &&
          <>
            <span className="dividir" />
            <button onClick={clickNotification} id="notification">
              <img src={bell} alt="Notificação" />
              <span>{lateCount}</span>
            </button>
          </>
        }
      </S.RightSide>
    </S.Container>
  )
}

export default Header;
