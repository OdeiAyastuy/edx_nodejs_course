const fs = require('fs')
const path = require('path')
var f_data = []

const csv_to_json_v1 = (name='customer-data.csv') => {
    console.log(`Start reading the file ${name}`)
    const fetchFile = (r_name, callback) => {
        fs.readFile(path.join(__dirname, r_name), {encoding: 'utf-8'}, function (error, data) {
            if (error) return console.error(error)

            let keys = data.split("\r\n")[0]
            let keys_arr = keys.split(",")
            let values = data.split("\r\n").splice(1)

            for (i = 0; i < values.length; i++) {
                let client_obj = {}
                client = values[i].split(",")
                for (j = 0; j < keys_arr.length; j++) {
                    client_obj[keys_arr[j]] = client[j]
                }
                f_data.push(client_obj)
            }
            var json_data = JSON.stringify(f_data, null, 2)
            callback(json_data)
        })
    }
    fetchFile(name, (w_data) => {
        fs.writeFileSync(path.join(__dirname, 'customer-data_v1.json'), w_data)
        console.log('The conversion from csv to json is done')
    })
}
csv_to_json_v1(process.argv[2])
