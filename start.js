module.exports = async (kernel) => {
  let script = {
    daemon: true,
    run: [
    {
      method: "shell.run",
      params: {
        path: "app",
        conda: "env",
        message: [
          "python demo.py"
        ]
      }
    }, 
    {
      "method": "local.set",
      "params": {
        "url": "{{input.event[0]}}"
      }
    }, {
      "method": "proxy.start",
      "params": {
        "uri": "{{local.url}}",
        "name": "Local Sharing"
      }
    }]
  }
  return script
}
