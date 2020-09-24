import styled from 'styled-components';

export const Container = styled.div`
    width: 250px;
    height: 200px;
    box-shadow: 0px -2px 11px 2px rgba(0,0,0,0.75);
    border-radius: 10px;
    margin-top: 30px;

    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;

    margin: 10px;
    cursor: pointer;
    transition: all 0.3s ease;
    opacity: ${props => props.done ? 0.5 : 1};

    &:hover{
        opacity: 0.5;
    }
`

export const TopCard = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
`

export const BottomCard = styled.div`
    width: 100%;
    display: flex;
    justify-content: space-around;

    strong {
        color: #EE6B26;
        font-weight: bold;
    }

    span{
        color: #707070
    }
`