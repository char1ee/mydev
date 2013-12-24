require(['../amd_modules/tab/tab'], function (Tab) {
    var name = 'global';
    var a = {
        name: 'haozi'
    };

    function hello() {
        alert(name);
    }

    // var b = hello.bind(a);
    // b();
});