import { execSync } from 'child_process';

const gitPath = 'G:\\Program Files (x86)\\Git\\cmd';
const nodePath = 'C:\\Program Files\\nodejs';
const env = {
  ...process.env,
  PATH: `${gitPath};${nodePath};${process.env.PATH || ''}`
};

const commitMsg = process.argv.slice(2).join(' ') || 'chore: atualizacao da base de codigo';

try {
  console.log('⚡ Executando build de produção...');
  execSync('npx vite build', { env, stdio: 'inherit' });

  console.log('📦 Adicionando arquivos ao Git...');
  execSync('git add -A', { env, stdio: 'inherit' });

  const status = execSync('git status --porcelain', { env, encoding: 'utf8' }).trim();
  if (status) {
    console.log(`📝 Criando commit: "${commitMsg}"...`);
    execSync(`git commit -m "${commitMsg.replace(/"/g, '\\"')}"`, { env, stdio: 'inherit' });
  } else {
    console.log('ℹ️ Nenhuma alteração pendente para commit.');
  }

  console.log('🚀 Enviando para o GitHub (origin main)...');
  execSync('git push origin main', { env, stdio: 'inherit' });
  console.log('✅ Sincronização concluída com sucesso!');
} catch (error) {
  console.error('❌ Erro na sincronização:', error.message);
  process.exit(1);
}
