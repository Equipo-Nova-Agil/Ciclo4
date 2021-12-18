import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import { styled } from '@mui/material/styles';

const AccordionStyled = styled((props) => <Accordion {...props} />)(({ theme }) => ({
  backgroundColor: '#e7ebe5',
}));
const AccordionSummaryStyled = styled((props) => <AccordionSummary {...props} />)(({ theme }) => ({
  backgroundColor: '#e3e3e3',
}));
const AccordionDetailsStyled = styled((props) => <AccordionDetails {...props} />)(({ theme }) => ({
  backgroundColor: '#f3f4f6',
}));

export { AccordionStyled, AccordionSummaryStyled, AccordionDetailsStyled };
