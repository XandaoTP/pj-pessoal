import { useFormik } from "formik";
import { Button, Card, Container, Form, FormControlProps } from "react-bootstrap";
import styled from "styled-components";
import bckground from "../../src/assets/img/papel.jpg"
import logo from "../../src/assets/img/Quer nos ajudar.png"
import { collection, addDoc } from "firebase/firestore";
import { db } from "../services/firebase";
import { toast } from 'react-toastify';


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
             await addDoc(collection(db, "nomes"), {
                name: values.name,
                Nomebb: values.namebb
              });  
              formik.resetForm();
              toast.success('Obrigado por sugerir um nome. Sua sugestão foi armazenada e em breve divulgaremos a lista de sugestões.', {
                position: "top-center",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                });
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
                <Cardbck className="p-5 mt-5">
                <p className="fw-bold">Sugira quantas vezes quiser!</p>
                <Form onSubmit={formik.handleSubmit}>
                <Form.Label className='mb-0'>Seu nome</Form.Label>
                <Form.Control 
                type="text"
                placeholder="Digite seu nome"
                required
                {...formProps('name')}
              />
              <Form.Label className='mb-0'>Sua sugestão</Form.Label>
              <Form.Control
                placeholder="Digite sua sugestao."
                required
                {...formProps('namebb')}
                />
                <div className="d-grid mt-3 mb-3">
                    <CustomButton 
                    className=" mt-3 bg-secondary"
                    type='submit'
                    >Enviar</CustomButton>
                </div>
                </Form>
                </Cardbck>
            </Container>
        </Bckgroud>
    )
}

const Bckgroud = styled.div`
    background: url(${bckground});
    background-size: cover;
`
const Cardbck = styled(Card)`
    background-color: #f6e9f2;
    border-radius: 30px;
    box-shadow: -2px 5px 13px -3px #000000;
`
const CustomButton = styled(Button)`
    border: none;
`