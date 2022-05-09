import * as express from 'express';
import * as cd from 'child_process';

const app = express();

app.get('/execmd/:cmd/:args', (req, res) => {
  const cmd = req.params.cmd;
  const args = req.params.args;

  cd.exec(`${cmd} ${args}`, (err: Error | null, stdout: string, stderr: string) => {
    if (err) {
      res.send({
        error: err.message,
      });
    } else {
      res.send({
        output: stdout,
      });
    }

    if (stderr) {
      res.send({
        error: stderr,
      });
    }
  });
});

app.get('*', (_, res) => {
  res.send('<h1>404</h1>');
});


app.listen(5500, () => {
  console.log('Server is up on port 5500');
});

// Ejemplo de entrada válida:
// http://localhost:5500/execmd/ls/ -la
