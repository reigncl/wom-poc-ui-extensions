import React from 'react';
import PropTypes from 'prop-types';
import { render } from 'react-dom';
import {
  DisplayText,
  TextField,
  FieldGroup,
  RadioButtonField,
  Form,
  FormLabel,
  ToggleButton,
  Select,
  Option
} from '@contentful/forma-36-react-components';
import { init, locations } from 'contentful-ui-extensions-sdk';
import '@contentful/forma-36-react-components/dist/styles.css';
import '@contentful/forma-36-fcss/dist/styles.css';
import './index.css';

export class App extends React.Component {

  static propTypes = {
    sdk: PropTypes.object.isRequired
  };

  planColumnLayouts = {
    layout1: { img: require('./images/plan-layout-1.png'), fields: { gigas: '', minutes: '', extras: 'none', price: '' } },
    layout2: { img: require('./images/plan-layout-2.png'), fields: { pretitle: '', title: '', extras: 'none'} },
    layout3: { img: require('./images/plan-layout-3.png'), fields: { supertitle: '', pretitle: '', title: '', social: 'none', legal: '' } },
    layout4: { img: require('./images/plan-layout-4.png'), fields: { pretitle: '', title: '', subtitle: '', legal: '' } },
    layout5: { img: require('./images/plan-layout-5.png'), fields: { supertitle: '', price: '', subtitle: '' } },
    layout6: { img: require('./images/plan-layout-6.png'), fields: { price: '', legal: '' } },
  }

  planExtras = [
    { id: 'none', label: 'None' },
    { id: 'whatsappIlimitado', label: 'WhatsApp ilimitado' },
    { id: 'libreRoaming', label: 'Libre en roaming' }
  ]

  planSocial = [
    { id: 'none', label: 'None' },
    { id: 'all', label: 'All' }
  ]

  constructor(props) {
    super(props);

    this.state = {
      name: props.sdk.entry.fields.name.getValue(),
      layout: props.sdk.entry.fields.layout.getValue(),
      fields: props.sdk.entry.fields.fields.getValue() || {},
    };

    console.log(this.state);
  }

  onFieldChange = e => {
    const fieldName = e.currentTarget.getAttribute('name');
    const fieldValue = e.currentTarget.value;
    this.setState({
      [fieldName]: fieldValue
    });
    let state = this.state;
    state[fieldName] = fieldValue;
    this.props.sdk.entry.fields[fieldName].setValue(fieldValue);
  };

  onLayoutToggle = id => {
    const layout = id;
    this.setState({ layout });
    this.props.sdk.entry.fields['layout'].setValue(id);

    const fields = this.planColumnLayouts[id].fields;
    this.setState({ fields });
    this.props.sdk.entry.fields['fields'].setValue(fields);
  }

  onDataFieldChange = e => {
    const fieldName = e.currentTarget.getAttribute('name');
    const fieldValue = e.currentTarget.value;
    let fields = this.state.fields;
    fields[fieldName] = fieldValue;
    this.setState({ fields} );
    this.props.sdk.entry.fields['fields'].setValue(fields);
  };


  render() {
    return (
      <>
      <Form className="f36-margin--l">
        <DisplayText>Plan</DisplayText>

        <FieldGroup>
          <TextField
            required
            name='name'
            id='name'
            labelText='Name'
            onChange={this.onFieldChange}
            value={this.state.name}
          />
        </FieldGroup>

        <FormLabel>Layout</FormLabel>
        <FieldGroup row={true}>
          {Object.keys(this.planColumnLayouts).map((key, index) => {
            return (
              <ToggleButton
                id={key}
                isDisabled={false}
                isActive={this.state.layout === key}
                onToggle={() => this.onLayoutToggle(key)}
              >
                <div class='layout-box'><img src={`${this.planColumnLayouts[key].img}`}/></div>
              </ToggleButton>
            );
          })}
        </FieldGroup>

        {(this.state.layout === 'layout3' || this.state.layout === 'layout5') && (
          <>
            <TextField
              name='supertitle'
              id='supertitle'
              labelText='Supertitle'
              onChange={this.onDataFieldChange}
              value={this.state.fields.supertitle || ''}
            />
          </>
        )}

        {(this.state.layout === 'layout2' || this.state.layout === 'layout3' || this.state.layout === 'layout4') && (
          <>
            <TextField
              name='pretitle'
              id='pretitle'
              labelText='Pretitle'
              onChange={this.onDataFieldChange}
              value={this.state.fields.pretitle || ''}
            />
          </>
        )}

        {(this.state.layout === 'layout2' || this.state.layout === 'layout3' || this.state.layout === 'layout4') && (
          <>
            <TextField
              name='title'
              id='title'
              labelText='Title'
              onChange={this.onDataFieldChange}
              value={this.state.fields.title || ''}
            />
          </>
        )}

        {(this.state.layout === 'layout1') && (
          <>
            <TextField
              name='gigas'
              id='gigas'
              labelText='Gigas'
              textInputProps={ {type: 'number' }}
              onChange={this.onDataFieldChange}
              value={this.state.fields.gigas || ''}
            />
          </>
        )}

        {(this.state.layout === 'layout1') && (
          <>
            <TextField
              name='minutes'
              id='minutes'
              labelText='Minutes'
              helpText='0 = minutos libres'
              textInputProps={ {type: 'number' }}
              onChange={this.onDataFieldChange}
              value={this.state.fields.minutes || ''}
            />
          </>
        )}

        {(this.state.layout === 'layout3') && (
          <>
            <FormLabel>Social</FormLabel>
            <Select id='social' name='social' onChange={this.onDataFieldChange} value={this.state.fields.social || ''}>
              {this.planSocial.map((obj, index) => {
                return (
                  <Option value={obj.id}>
                    {obj.label}
                  </Option>
                );
              })}
            </Select>
          </>
        )}

        {(this.state.layout === 'layout1' || this.state.layout === 'layout2') && (
          <>
            <FormLabel>Extras</FormLabel>
            <Select id='extras' name='extras' onChange={this.onDataFieldChange} value={this.state.fields.extras || ''}>
              {this.planExtras.map((obj, index) => {
                return (
                  <Option value={obj.id}>
                    {obj.label}
                  </Option>
                );
              })}
            </Select>
          </>
        )}


        {(this.state.layout === 'layout1' || this.state.layout === 'layout5' || this.state.layout === 'layout6') && (
          <>
            <TextField
              name='price'
              id='price'
              labelText='Price'
              textInputProps={ {type: 'number' }}
              onChange={this.onDataFieldChange}
              value={this.state.fields.price || ''}
            />
          </>
        )}

        {(this.state.layout === 'layout4' || this.state.layout === 'layout5') && (
          <>
            <TextField
              name='subtitle'
              id='subtitle'
              labelText='Subtitle'
              onChange={this.onDataFieldChange}
              value={this.state.fields.subtitle || ''}
            />
          </>
        )}

        {(this.state.layout === 'layout3' || this.state.layout === 'layout4' || this.state.layout === 'layout6') && (
          <>
            <TextField
              name='legal'
              id='legal'
              labelText='Legal'
              onChange={this.onDataFieldChange}
              value={this.state.fields.legal || ''}
            />
          </>
        )}



      </Form>


      </>
    );
  }
}

init(sdk => {
  if (sdk.location.is(locations.LOCATION_ENTRY_EDITOR)) {
    render(<App sdk={sdk} />, document.getElementById('root'));
  }
});

/**
 * By default, iframe of the extension is fully reloaded on every save of a source file.
 * If you want to use HMR (hot module reload) instead of full reload, uncomment the following lines
 */
// if (module.hot) {
//   module.hot.accept();
// }
