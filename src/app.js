import $ from 'jquery';
import { Observable } from 'rxjs';

const numbers = [33,44,55,66,77];

const numbers$ = Observable.from(numbers);

// numbers$.subscribe(
//     v => console.log(v),
//     err => console.log(err),
//     () => console.log('completed')
// )

const posts = [
    {title: 'Post 1', body: 'This is the body'},
    {title: 'Post 2', body: 'This is the body'},
    {title: 'Post 3', body: 'This is the body'}
]

const posts$ = Observable.from(posts);

// posts$.subscribe(
//     v => console.log(v),
//     err => console.log(err),
//     () => console.log('completed')
// )

function getUser(username){
    return $.ajax({
        url: `https://api.github.com/users/${username}`,
        dataType: 'jsonp'
    }).promise()
}

Observable.fromPromise(getUser('iliassSabillah'))
    .subscribe(x => {
        $('#name').text(x.data.name)
        // console.log(x)
    })

function getUserRepos(username){
        return $.ajax({
            url: `https://api.github.com/users/${username}/repos`,
            dataType: 'jsonp'
        }).promise()
    }

const inputName$ = Observable.fromEvent($('#inputName'), 'keyup')

inputName$
.subscribe(e => {
    Observable.fromPromise(getUserRepos(e.target.value))
    .debounceTime(500)
    .subscribe(x => {
        console.log(x)
            // x.data.map(repo=>{
            //     $('#repos').append(`<li>${repo.name}</li>`)
                
            // })
        })
})
