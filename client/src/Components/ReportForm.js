import React from 'react';
import { Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap';

const ReportForm = (props) => {
  return (
    <Form>
      <FormGroup>
        <Label for="exampleEmail">First Name</Label>
        <Input type="email" name="email" id="exampleEmail" placeholder="John" />
      </FormGroup>
      <FormGroup>
        <Label for="examplePassword">Last Name</Label>
        <Input type="password" name="password" id="examplePassword" placeholder="Doe" />
      </FormGroup>
      <FormGroup>
        <Label for="exampleSelect">Incident Code</Label>
        <Input type="select" name="select" id="exampleSelect">
          <option>1 - Wildlife</option>
          <option>2 - Path Blockages</option>
          <option>3 - Suspicious Human Activity</option>
          <option>4 - Lost/Found Possession </option>
          <option>5 - Other (detail in report summary)</option>
        </Input>
      </FormGroup>
      <FormGroup>
        <Label for="exampleText">Report statement</Label>
        <Input type="textarea" name="text" id="exampleText" />
      </FormGroup>
      <FormGroup>
        <Label for="exampleFile">upload image</Label>
        <Input type="file" name="file" id="exampleFile" />
        <FormText color="muted">
          This is some placeholder block-level help text for the above input.
          It's a bit lighter and easily wraps to a new line.
        </FormText>
      </FormGroup>
      <Button>Submit</Button>
    </Form>
  );
}

export default ReportForm;
