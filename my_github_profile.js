/**
 * Created by davidblodgett on 4/25/16.
 */

$(document).ready(function(){
    function getUserProfile(username) {
        $.ajax({
            url: 'https://api.github.com/users/' + username,
            method: 'get',
            success: successUser,
            error: errorUser,
            beforeSend: function (xhr) {
                xhr.setRequestHeader('Authorization', 'Token ' + 'e6efde8fb145b4642eced033f61155775ee447a3');
            }
        });
    }

    function errorUser(err) {
        console.log(err.responseText);
    }

    function successUser(resp) {
        var userProfile = `
                <img src='${resp.avatar_url}' height="150" width="150"/>
                <h2>${resp.name} </h2 >
                <h2>${resp.login} </h2>
                `;

        var userDetails = `
                <l>
                <li><i class="fa fa-map-marker"></i>${resp.location}</li>
                <li><i class="fa fa-envelope-o"></i> ${resp.email}</li>
                <li><i class="fa fa-link"></i>${resp.blog}</li>
                <li><i class="fa fa-clock-o"></i>${resp.created_at}</li>
                </l>
                `;

        $('#user_profile').html(userProfile);
        $('#user_details').html(userDetails);

    }

    function getRepositories(username) {
        $.ajax({
            url: 'https://api.github.com/users/' + username + '/repos',
            method: 'get',
            success: successRepo,
            error: errorRepo,
            beforeSend: function (xhr) {
                xhr.setRequestHeader('Authorization', 'Token ' + 'e6efde8fb145b4642eced033f61155775ee447a3');
            }
                // headers: {
                    // 'Authorization': 'token  ${token}
        });
    }

    function successRepo(resp) {
        // console.log('resp',resp);
        resp.forEach(function (item) {
            console.log('item',item);
                $("#repositories").append(
                    `<li><a href=${item.html_url}>${item.name}</a>
                    <p>updated at ${item.updated_at}</p>
                    </li>`
                )
            });
        }

    function errorRepo(err) {
        console.log(err.responseText);
        }

    getUserProfile('D4VEB');
    getRepositories('D4VEB');

});
