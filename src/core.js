var Default = ht.Default,
    def = Default.def,
    ui = ht.ui,
    NULL = null;
Default.setImage('Uploader_true', {
    width: 100,
    height: 100,
    comps: [{
            type: "oval",
            background: "rgb(38,255,0)",
            rect: [0,0,100,100]
        },
        {
            type: "shape",
            borderWidth: 16,
            borderColor: "#fff",
            points: [14.75638,45.93968,46.91415,70.78886,85.24362,29.21114]
        }
    ]
});
Default.setImage('Uploader_false', {
    width: 100,
    height: 100,
    comps: [{
            type: "oval",
            background: "rgb(255,0,0)",
            rect: [0,0,100,100]
        },
        {
            type: "shape",
            borderWidth: 16,
            borderColor: "#fff",
            points: [74.22274,22.57541,25.98608,80.23202]
        },
        {
            type: "shape",
            borderWidth: 16,
            borderColor:  "#fff",
            points: [22.25058,23.38747,78.28306,78.93271]
        }
    ]
});
Default.setImage('Uploader_delete', {
    width: 100,
    height: 100,
    comps: [{
            type: "shape",
            borderWidth: 8,
            borderColor: "#979797",
            points: [3.9818,4.77816,95.2446,96.51877]
        },
        {
            type: "shape",
            borderWidth: 8,
            borderColor: "#979797",
            points: [95.72241,4.77816,5.25597,95.72241]
        }
    ]
});
Default.setImage('Uploader_hoverDelete', {
    width: 100,
    height: 100,
    comps: [{
        type: "shape",
        borderWidth: 8,
        borderColor: "#31A5FF",
        points: [3.9818,4.77816,95.2446,96.51877]
    },
    {
        type: "shape",
        borderWidth: 8,
        borderColor: "#31A5FF",
        points: [95.72241,4.77816,5.25597,95.72241]
    }
    ]
});
Default.setImage('Uploader_activeDelete', {
    width: 100,
    height: 100,
    comps: [{
        type: "shape",
        borderWidth: 8,
        borderColor: "#31F5FF",
        points: [3.9818,4.77816,95.2446,96.51877]
    },
    {
        type: "shape",
        borderWidth: 8,
        borderColor: "#31F5FF",
        points: [95.72241,4.77816,5.25597,95.72241]
    }
    ]
})
Default.setImage('Uploader_file', {
    width: 100,
    height: 100,
    comps: [{
            type: "shape",
            borderWidth: 3,
            borderColor: "#979797",
            closePath: true,
            points: [10.67198,1.97609,10.67198,97.57298,88.57743,98.02391,88.57743,28.12996,66.44036,1.97609]
        },
        {
            type: "shape",
            borderWidth: 3,
            borderColor: "#979797",
            points: [66.44036, 1.97609, 66.44036, 27.67903, 88.36457, 27.67903]
        },
        {
            type: "shape",
            borderWidth: 3,
            borderColor: "#979797",
            points: [24.29479, 52.48011, 73.46462, 52.70557]
        },
        {
            type: "shape",
            borderWidth: 3,
            borderColor: "#979797",
            points: [24.29479, 75.25201, 73.85606, 75.25201]
        }
    ]
});