import { useNavigate } from "react-router-dom";
import { MdEmail, MdLock, MdPerson } from "react-icons/md";
import { Button } from "../../components/Button";
import { Header } from "../../components/Header";
import { Input } from "../../components/Input";
import { api } from "../../services/api";

import { useForm } from "react-hook-form";

import {
    Container,
    Title,
    Column,
    TitleLogin,
    SubtitleLogin,
    JaTenhoContaText,
    FazerLoginText,
    Row,
    Wrapper,
    MsgAceitoPoliticas,
} from "./styles";

const Register = () => {
    const navigate = useNavigate();

    const {
        control,
        handleSubmit,
        formState: { errors },
    } = useForm({
        reValidateMode: "onChange",
        mode: "onChange",
    });

    const onSubmit = async (formData) => {
        try {
            const response = await api.post("/users", {
                name: formData.nomecompleto,
                email: formData.email,
                senha: formData.senha,
            });

            if (response.status === 201) {
                alert("Usuário cadastrado com sucesso!");
                navigate("/login");
                return;
            }

            alert("Erro ao cadastrar usuário");
        } catch (e) {
            alert("Erro ao cadastrar usuário");
        }
    };

    const handleClickLogin = () => {
        navigate("/login");
    };

    return (
        <>
            <Header />
            <Container>
                <Column>
                    <Title>
                        A plataforma para você aprender com experts, dominar as
                        principais tecnologias e entrar mais rápido nas empresas
                        mais desejadas.
                    </Title>
                </Column>
                <Column>
                    <Wrapper>
                        <TitleLogin>Comece agora grátis</TitleLogin>
                        <SubtitleLogin>
                            Crie sua conta e make the change._
                        </SubtitleLogin>
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <Input
                                placeholder="Nome completo"
                                leftIcon={<MdPerson />}
                                name="nomecompleto"
                                control={control}
                            />
                            {errors.nomecompleto && (
                                <span>Nome completo é obrigatório</span>
                            )}
                            <Input
                                placeholder="E-mail"
                                leftIcon={<MdEmail />}
                                name="email"
                                control={control}
                            />
                            {errors.email && <span>E-mail é obrigatório</span>}
                            <Input
                                type="password"
                                placeholder="Senha"
                                leftIcon={<MdLock />}
                                name="senha"
                                control={control}
                            />
                            {errors.senha && <span>Senha é obrigatória</span>}
                            <Button
                                title="Criar minha conta"
                                variant="secondary"
                                type="submit"
                            />
                        </form>
                        <Row>
                            <MsgAceitoPoliticas>
                                Ao clicar em "criar minha conta grátis", declaro
                                que aceito as Políticas de Privacidade e os
                                Termos de Uso da DIO.
                            </MsgAceitoPoliticas>
                        </Row>
                        <Row>
                            <JaTenhoContaText>Já tenho conta</JaTenhoContaText>
                            <FazerLoginText onClick={handleClickLogin}>
                                Fazer Login
                            </FazerLoginText>
                        </Row>
                    </Wrapper>
                </Column>
            </Container>
        </>
    );
};

export { Register };
