import { useFormik } from "formik";
import { Button, Container, Form, FormControlProps } from "react-bootstrap";
import styled from "styled-components";
import bckground from "../../src/assets/img/papel.jpg"
import logo from "../../src/assets/img/Quer nos ajudar.png"
import { collection, addDoc } from "firebase/firestore";
import { db } from "../services/firebase";


type Props = FormControlProps

type FormValues = {
    name: string
    namebb: string
}
export function Home ( props : Props ) {
    const formik = useFormik({
        initialValues: {
            name: '',
            namebb:''
        },
        onSubmit: async (values) => {
            const docRef = await addDoc(collection(db, "nomes"), {
                name: values.name,
                Nomebb: values.namebb
              });  
              console.log(docRef)
            }
    })

    const formProps = (fieldName: keyof FormValues ) => {
    return {
        ...formik.getFieldProps(fieldName),
        controlId: `input-${fieldName}`
    }

}
    return (
        <Bckgroud className="vh-100 ">
            <Container className="d-flex flex-column align-items-center">
                <img src={logo} className='mt-4' width="290px" height="270px" alt='nossamenina'/>
                <Form onSubmit={formik.handleSubmit}>
                <Form.Label className='mb-0'>Seu nome</Form.Label>
                <Form.Control 
                type="text"
                placeholder="Digite seu nssome"
                {...formProps('name')}
              />
              <Form.Label className='mb-0'>Sua sugestão</Form.Label>
              <Form.Control
                placeholder="Digite o nome da nossa menina."
                {...formProps('namebb')}
                />
                <div className="d-grid mt-3 mb-3">
                    <Button 
                    className=" mt-3"
                    type='submit'
                    >Enviar</Button>
                </div>
                </Form>
            </Container>
        </Bckgroud>
    )
}

const Bckgroud = styled.div`
    background: url(${bckground})
`