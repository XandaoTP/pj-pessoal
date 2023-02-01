import { useFormik } from "formik";
import { Button, Card, Col, Container, Form, Row, Table } from "react-bootstrap";
import styled from "styled-components";
import logo from "../../src/assets/img/Quer nos ajudar.png"
import { collection, addDoc, getDocs, DocumentData } from "firebase/firestore";
import { db } from "../services/firebase";
import { toast } from 'react-toastify';
import { SetStateAction, useEffect, useReducer, useState } from "react";

const getNames = async () => {
    const doc = collection(db, 'nomes')
    const names = await getDocs(doc)
    const snapshot = names.docs.map(doc =>({...doc.data(), id:doc.id}))
    const order = snapshot.sort()  
    return order
}


type FormValues = {
    name: string
    Nomebb: string
    id: string
    collection: string
    nomes: string
    payload: any
    doc: string
    localeCompare: any
}
export function Home () {
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
              toast.success(`Obrigado, ${values.name}! Sua sugestão já está na lista abaixo.`, {
                position: "top-center",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                });
                forceUpdate()
            }
    })
    const formProps = (fieldName: keyof FormValues ) => {
    return {
        ...formik.getFieldProps(fieldName),
        controlId: `input-${fieldName}`
    }
}

const [ attvalue, forceUpdate] = useReducer(x=> x + 1, 0);
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
        }, [attvalue])

            const [valor, setValor] = useState('');
            const handleChange = (event: { target: { value: SetStateAction<string>; }; }) => {
              setValor(event.target.value);
            };
            
        return (
        <div className="vh-100 ">
            <Container className="d-flex flex-column align-items-center">
                <img src={logo} className='mt-4' width="326px" height="290px" alt='nossamenina'/> 
                <p className="fw-bold text-center text-dark mt-3"> MAMÃE PRISCILA E PAPAI ALEXANDRE</p>
                <Cardbck className="p-5 mt-1">                    
                    <p className="fw-bold text-center">Sugira quantas vezes quiser!</p>
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
                        {...formProps('Nomebb')}
                        />
                        <div className="d-grid mt-3 mb-3">
                            <CustomButton 
                            className=" mt-3 bg-secondary"
                            type='submit'
                            >Enviar</CustomButton>
                        </div>
                    </Form>
                </Cardbck>
                <label htmlFor="name">Procure pelo nome do bebe</label><input id='name' className="m-3" type="text" value={valor} onChange={handleChange}/>
                {names ? (
                    <Row>
                        <Col xs={12} >
                    <Table className="opacity-75 ">
                        <thead>
                            <tr className="bg-dark">
                                <th className="text-start text-white fw-bold opacity-100">Nome</th>
                                <th className="text-end text-white fw-bold">Sugestão</th>
                            </tr>
                        </thead>
                        {names.filter((el: any) => el.Nomebb.toString().toLowerCase().includes(valor.toLowerCase()))
                        .sort((a: FormValues, b: FormValues) => { 
                            return a.name.localeCompare(b.name) })
                            .map((name: FormValues) => (
                        <tbody>
                            <Nomebb className="text-white">
                                <td className="text-start text-dark fw-bold">{name.name}:</td>
                                <Tdname className="text-end fw-bold">{name.Nomebb}</Tdname>
                            </Nomebb>    
                        </tbody>
                    ))}   
                    </Table>
                    </Col>
                    </Row>
                    ) : (
                    <p>.asasaasasa</p>               
                )
            }
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
const Nomebb = styled.tr`
    color: #9f1896;
    background-color: #f6e9f2;
`
const Tdname = styled.td`
    color: #c73098 !important;
    opacity: 100;
    word-break: break-all;
    width: 100%;
`
