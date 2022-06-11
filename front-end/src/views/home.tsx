import { useFormik } from "formik";
import { Button, Card, Container, Form } from "react-bootstrap";
import styled from "styled-components";
import logo from "../../src/assets/img/Quer nos ajudar.png"
import { collection, addDoc, getDocs, DocumentData } from "firebase/firestore";
import { db } from "../services/firebase";
import { toast } from 'react-toastify';
import { useEffect, useState } from "react";

const getNames = async () => {
    const doc = collection(db, 'nomes')
    const names = await getDocs(doc)
    return names.docs.map(doc =>({...doc.data(), id:doc.id}))  
}


type FormValues = {
    name: string
    Nomebb: string
    id: string
    collection: string
    nomes: string
    payload: any
    doc: string
}
export function Home () {
    const [disable, setDisable] = useState(false)
    const formik = useFormik({
        initialValues: {
            name: '',
            Nomebb:''
        },
        onSubmit: async (values) => {
             await addDoc(collection(db, "nomes"), {
                name: values.name,
                Nomebb: values.Nomebb
              });  
              formik.resetForm();
              setTimeout(function() {
                window.location.reload();
              }, 5000); // 3 minutos
              toast.success('Obrigado por sugerir um nome. Sua sugestão será relacionada na lista abaixo', {
                position: "top-center",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                });
                setDisable(true)
            }
    })

    const formProps = (fieldName: keyof FormValues ) => {
    return {
        ...formik.getFieldProps(fieldName),
        controlId: `input-${fieldName}`
    }
}
const [names, setNames] = useState<DocumentData>()
        useEffect(() => {
            const fetch = async () => {
                try{
                    const result = await getNames()
                    setNames(result)
               } catch{
                    toast.error('Tente novamente', {
                    })
               }      
            }
            fetch()
        }, [])
        console.log(names)
    return (
        <div className="vh-100 ">
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
                disabled={disable}
              />
              <Form.Label className='mb-0'>Sua sugestão</Form.Label>
              <Form.Control
                placeholder="Digite sua sugestao."
                required
                {...formProps('Nomebb')}
                disabled={disable}
                />
                <div className="d-grid mt-3 mb-3">
                    <CustomButton 
                    className=" mt-3 bg-secondary"
                    type='submit'
                    >Enviar</CustomButton>
                </div>
                </Form>
                {!names ? (
                    <p>....</p>
                ) : (
                    <table>
                    {names.map((name: FormValues) => (
                        <tbody>
                            <tr className="text-start fw-bold">{name.name}:</tr>
                            <tr className="text-end fw-bold">{name.Nomebb}</tr>
                        </tbody>
                    ))}   
                    </table>
                )
            }
                </Cardbck>
            </Container>
        </div>
    )
}

const Cardbck = styled(Card)`
    background-color: #f6e9f2;
    border-radius: 30px;
    box-shadow: -2px 5px 13px -3px #000000;
    margin-bottom: 50px;
`
const CustomButton = styled(Button)`
    border: none;
`
const Pnames = styled.p`
    font-size: 10px;
`
