import { Container } from "react-bootstrap";
import styled from "styled-components";
import bckground from "../../src/assets/img/papel.jpg"
import logo from "../../src/assets/img/Quer nos ajudar.png"

export function Home () {
    return (
        <Bckgroud className="vh-100 ">
            <Container className="d-flex flex-column align-items-center">
                <img src={logo} className='mt-4' width="290px" height="270px"/>
            </Container>
        </Bckgroud>
    )
}

const Bckgroud = styled.div`
    background: url(${bckground})
`