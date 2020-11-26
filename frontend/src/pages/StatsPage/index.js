import React from 'react';
import Header from '../../components/Header';

import { Container } from 'react-bootstrap';

import ShorteneService from '../../services/shortenerService';

import { parseISO, formatRelative, parse } from 'date-fns';
import ptBR from 'date-fns/locale/pt-BR';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { StatsContainer, StatsRow, StatsBox, StatsTitle } from './styles';

class StatsPage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            isLoading: false,
            shorteneURL: {},
            errorMessage: '',
        }
    }

    async componentDidMount() {
        const { code } = this.props.match.params;
        try {
            const service = new ShorteneService();
            const shorteneURL = await service.getStats(code);

            const parsedDate = parseISO(shorteneURL.updatedAt);
            const currentDate = new Date();

            const relativeDate = formatRelative(parsedDate, currentDate, {
                locale: ptBR,
            });

            shorteneURL.relativeDate = relativeDate;

            this.setState({ isLoading: false, shorteneURL });
        } catch (error){
            this.setState({ isLoading: false, errorMessage: 'Ops, a URL solicitada não existe.'});
        }
    }

    render() {
        const {errorMessage, shorteneURL} = this.state;

        return (
            <Container>
                <Header>Estatisticas: </Header>
                {errorMessage ? (
                    <StatsContainer className="text-center">
                        <FontAwesomeIcon size="3x" color="#f8d7da" icon="exclamation-triangle" />
                    <p className="m-3">{errorMessage}</p>
                    <a className="btn btn-primary" href="/">Encurtar nova URL</a>
                    </StatsContainer>
                ) : (
                    <StatsContainer className="text-center">
                        <p><b>https://wfspitu.tk/{shorteneURL.code}</b></p>
                <p>Redireciona para:<br/>{shorteneURL.url}</p>
                    <StatsRow>
                    <StatsBox>
                        <b>{shorteneURL.hits}</b>
                        <StatsTitle>Visitas</StatsTitle>
                    </StatsBox>
                    <StatsBox>
                        <b>{shorteneURL.relativeDate}</b>
                        <StatsTitle>Ultima Visita</StatsTitle>
                    </StatsBox>
                    </StatsRow>
                    <a className="btn btn-primary" href="/">Encurtar nova URL</a>
                    </StatsContainer>
                )}
            </Container>
        )
    }
}

export default StatsPage;