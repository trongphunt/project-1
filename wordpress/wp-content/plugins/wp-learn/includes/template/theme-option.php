<?php

/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
?>
<div style="margin-left: calc(35%);">
    <h1>Quản lý theme options</h1>
    <form align = "center" method="post" action="">
        <table>
            <tr>
                <td>Email</td>
                <td>
                    <input type="text" name="email" value="<?php echo $email;?>"/>
                </td>
            </tr>
            <tr>
                <td>Password</td>
                <td>
                    <input type="text" name="password" value="<?php echo $pass;?>"/>
                </td>
            </tr>
            <tr>
                <td></td>
                <td>
                    <input type="submit" name="save-theme-option" value="Save Theme Option"/>
                </td>
            </tr>
        </table>
    </form>
</div>

