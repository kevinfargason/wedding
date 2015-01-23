<table id="admin">
<thead>
  <tr>
    <th>Count</th>
    <th>Code</th>
    <th>Status</th>
    <th>Name</th>
    <th>RSVP</th>
    <th>Food</th>
  </tr>
</thead>
<tbody>
  {{#each people}}
  <tr>
  <td>&nbsp;</td>
    <td></td>
    <td></td>
    <td></td>
    <td></td>
    <td></td>
  </tr>
  {{#each family}}

  <tr>
    <td class="index"></td>
    <td>{{../code}}</td>
    <td>{{status}}</td>
    <td>{{title}} {{first}} {{last}}</td>
    <td>{{response.attending}}</td>
    <td>{{response.food}}</td>
  </tr>

  {{/each}}
  {{/each}}
</tbody>
</table>

<table>
  <tr>
    <th>Fi</th>
  </tr>
</table>