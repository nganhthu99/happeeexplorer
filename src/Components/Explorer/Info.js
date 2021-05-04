
import React from 'react';
import Typography from '@material-ui/core/Typography';
import Title from '../../Title';

const Info = (props) => {
    console.log(props.difficulty)

    return (
        <React.Fragment>
            <Title>Difficulty Level</Title>
            <Typography component="p" variant="h5">
                {props.difficulty}
            </Typography>
            <Title>Blocks</Title>
            <Typography component="p" variant="h5">
                {props.chainLength}
            </Typography>
            <Title>Pending Transactions</Title>
            <Typography component="p" variant="h5">
                {props.poolSize}
            </Typography>
        </React.Fragment>
    );
}

export default Info
