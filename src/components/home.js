import React, { Component } from 'react';
import { Tabs, Tab, FormGroup, ControlLabel, FormControl, Button, Table } from 'react-bootstrap'
import { Link, withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import styles from './styles'
import JSONPretty from 'react-json-pretty';

const mapStateToProps = (state) => ({
})

const mapDispatchToProps = (dispatch) => bindActionCreators({
}, dispatch)

class Home extends Component {
    constructor(props, context) {
        super(props, context);
    
        this.state = {
            script: ''
        };
    }

    goDeep(mapOrig, mapDest, key) {
        //console.log(key, typeof(mapOrig[key]), mapOrig[key])
        if (typeof(mapOrig[key]) === 'string') {
            mapDest[key] = true
        }
        else {
            if (!mapDest[key])
                mapDest[key] = {}
            for(let childKey in mapOrig[key]) {
                // console.log(childKey, mapOrig[key][childKey])
                this.goDeep(mapOrig[key], mapDest[key], childKey)
            }
        }
    }

    submit() {
        const script = JSON.parse(this.state.script)
        const langs = []
        const keys = {}
        for (let lang in script) {
            langs.push(lang)
            for (let group in script[lang]) {
                this.goDeep(script[lang], keys, group)
                // if (!keys[group]) {
                //     keys[group] = {}
                // }
                // for (let key in script[lang][group]) {
                //     keys[group][key] = true
                // }
            }
        }
        langs.map(lang => {
            if (!script[lang])
                script[lang] = {}
            this.checkScript(script[lang], keys)
        })
        console.log(langs, keys, script)
        this.setState({langs, keys, parsedScript: script})
    }

    checkScript(script, keys) {
        for (let key in keys) {
            if (typeof(keys[key]) === 'object') {
                if (!script[key])
                    script[key] = {}
                this.checkScript(script[key], keys[key])
            }
            else {
                if (!script[key])
                    script[key] = `---${key}---`
            }
        }
    }

  renderTab1() {
      return (
        <Tab eventKey={1} title="Tab 1">
            <div className='container'>
                <h3>JSON Script</h3>
            </div>
            <div className='container'>
                <form onSubmit={e => { e.preventDefault(); this.submit()}}>
                    <FormGroup controlId="formControlsTextarea">
                        <ControlLabel>Input Script</ControlLabel>
                        <FormControl componentClass="textarea" placeholder="Input JSON" rows="20" value={this.state.script} onChange={e => this.setState({script: e.target.value})} />
                    </FormGroup>
                    <Button type="submit">Submit</Button>
                </form>
            </div>
        </Tab>
      )
  }
    
  render() {
    return (
      <div style={styles.mainDiv}>
        <div className='container'>
          <h1>JSON Edit</h1>
        </div>
        <div className='container'>
          <Tabs defaultActiveKey={1} id="uncontrolled-tab-example">
            {this.renderTab1()}
            {this.renderTab2()}
            {this.renderTab3()}
          </Tabs>
        </div>
      </div>
    )
  }

  renderTab2() {
    //   return JSON.stringify(this.state.keys)
      return (
        <Tab eventKey={2} title="Tab 2">
            <div className='container'>
                <h3>Lang values</h3>
            </div>
            <div className='container'>
                <Table responsive>
                    <thead>
                        <tr>   
                            <th>#</th>
                            {this.state.langs && this.state.langs.map(value => <th>{value}</th>)}
                        </tr>
                    </thead>
                    <tbody>
                        {this.renderBody()}
                  </tbody>
                </Table>                
            </div>
        </Tab>
      )
  }

  renderBody() {
    const { keys, langs, parsedScript:script } = this.state
    const trs = []
    for (let group in keys) {
        // trs.push(
        //     <tr><th colSpan={langs.length + 1}>{group}</th></tr>
        // )
        this.renderGroup(group, langs.map(value => script[value][group]), keys[group], trs)
    }
    return trs
  }

  renderGroup(groupName, group, keys, trs, change) {
    const { langs, parsedScript:script } = this.state
    console.log(groupName, group, keys)
    if (keys === true) {
        trs.push(
            <tr>
                <td>{groupName}</td>
                {group.map((value, idx) => <td onClick={() => {
                    let newValue = prompt("Enter new value", value);
                    if (newValue && newValue !== value) {
                        change(newValue, idx)
                    }
                }}>{value}</td>)}
            </tr>
        )
        return
    }
    trs.push(<th colSpan={langs.length + 1}>{groupName}</th>)
    for (let key in keys) {
        this.renderGroup(key, group.map(value => value[key]), keys[key], trs, (value, idx) => {
            group[idx][key] = value
            // console.log(JSON.stringify(script))
            this.setState({parsedScript: script})
        })
    }
  }

  renderTab3() {
      return (
        <Tab eventKey={3} title="Tab 3">
            <div className='container'>
                <h3>Lang values</h3>
            </div>
            <div className='container'>
                <JSONPretty id="json-pretty" json={this.state.parsedScript}></JSONPretty>
            </div>
        </Tab>
      )
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Home))
