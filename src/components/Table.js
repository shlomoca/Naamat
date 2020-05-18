import React, { Component } from 'react';
 
const TableContent = (props) =>{
    const rows = props.numbers.map((row,index)=>{
        return(

               <tr>
<td>i am {row.num}</td>
    </tr>
        )
        
    })
    return <tbody> {rows}</tbody>
    
}
const TableHead = () =>{
    return(
        <tr>
<th> it is working</th>
    </tr>
        )
}

class Table extends Component{
    state = {
        numbers:[{num:'one'},
        {num:'two'},
        {num:'three'},
        {num:'four'},
        {num:'five'}]
      }
    render(){
        return(
            <table className="theTable">
        <TableHead />
        <TableContent numbers={this.state.numbers} />
      
    </table>
            )

    }
}
export default Table;
