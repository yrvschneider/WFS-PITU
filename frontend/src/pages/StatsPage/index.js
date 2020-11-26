import React from 'react';
import Header from '../../components/Header';

import { Container } from 'react-bootstrap';

import ShorteneService from '../../services/shortenerService';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { StatsContainer, StatsRow, StatsBox, StatsTitle } from './styles';

class StatsPage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            isLoading: false,
            shorteneURL: {},
            errorMessage: 'Error',
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
                    <p>Reultado</p>
                )}
            </Container>
        )
    }
}

export default StatsPage;