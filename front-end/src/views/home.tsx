import { Container, Form, FormControlProps } from "react-bootstrap";
import styled from "styled-components";
import bckground from "../../src/assets/img/papel.jpg"
import logo from "../../src/assets/img/Quer nos ajudar.png"

type Props = FormControlProps

export function Home ( props : Props ) {
    return (
        <Bckgroud className="vh-100 ">
            <Container className="d-flex flex-column align-items-center">
                <img src={logo} className='mt-4' width="290px" height="270px"/>
                <Form>
                <Form.Control {...props}
                type="text"
                label="ola"
                placeholder="Digite seu nssome"
              />
              <Form.Control {...props}
                label="Sua sugestão"
                placeholder="Digite o nome da nossa menina."
                />
                </Form>
            </Container>
        </Bckgroud>
    )
}

const Bckgroud = styled.div`
    background: url(${bckground})
`