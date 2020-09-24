import React, { useState } from 'react';
import {Redirect} from 'react-router-dom';
import * as S from './styles';
import Qr from 'qrcode.react';


//nossos componentes
import Header from '../../components/Header';
import Footer from '../../components/Footer';

function QrCode() {
    const [mac, setMac] = useState();
    const [redirect, setRedirect] = useState(false);

    async function SaveMac(){
        if(!mac)
            alert('Você precisa informar o número que apareceu no seu celular !');
        else{    
            await localStorage.setItem('@todo/macaddress', mac);
            setRedirect(true);
            window.location.reload();
        }
    }

    return(
        <S.Container>
            { redirect && <Redirect to="/"/> }
            <Header/>

            <S.Content>
                <h1>CAPTURE O QRCODE PELO SEU APP</h1>
                <p>Suas atividades serão sincronizadas com a do seu celular!</p>
                <S.QrCodeArea>
                    <Qr value='getmacaddress' size={350}/>
                </S.QrCodeArea>

                <S.ValidationCode>
                    <span>Digite o código que apareceu no seu celular</span>
                    <input type="text" onChange={e => setMac(e.target.value)} value={mac}/>
                    <button type="button" onClick={SaveMac}>SINCRONIZAR</button>
                </S.ValidationCode>
                
            </S.Content>

            <Footer/>
        </S.Container>
    )
}

export default QrCode;