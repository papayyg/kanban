const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

const buildDir = path.join(__dirname, 'build');
const distDir = path.join(__dirname, 'dist');
const htmlFileName = 'index.html';
const htmlFilePath = path.join(buildDir, htmlFileName);

console.log('--- Начало процесса сборки ---');

try {
    console.log('1/4. Запускаю "react-scripts build"...');
    execSync('react-scripts build', { stdio: 'inherit' });
    console.log('✅ Сборка React завершена.');
    console.log('\n2/4. Запускаю "gulp"...');
    execSync('gulp', { stdio: 'inherit' });
    console.log('✅ Задачи Gulp выполнены.');
    console.log(`\n3/4. Обрабатываю файл: ${htmlFilePath}`);

    if (!fs.existsSync(htmlFilePath)) {
        throw new Error(`Файл не найден по пути: ${htmlFilePath}. Проверьте настройки сборки.`);
    }

    let htmlContent = fs.readFileSync(htmlFilePath, 'utf8');

    const scriptRegex = /<script\b[^>]*>[\s\S]*?<\/script>/;
    const firstScriptMatch = htmlContent.match(scriptRegex);

    if (!firstScriptMatch) {
        console.warn('⚠️ Не найдено ни одного тега <script> в файле. Файл не изменен.');
        process.exit(0);
    }

    const scriptBlock = firstScriptMatch[0];
    console.log('Найден блок скрипта для перемещения.');

    htmlContent = htmlContent.replace(scriptBlock, '');

    htmlContent = htmlContent.replace('</body>', `${scriptBlock}\n</body>`);
    console.log('Блок скрипта успешно перемещен.');

    console.log(`\n4/5. Сохраняю результат в папку "${path.basename(distDir)}"`);

    if (!fs.existsSync(distDir)) {
        fs.mkdirSync(distDir, { recursive: true });
    }

    const date = new Date();
    const dateString = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;

    const newFileName = `${path.parse(htmlFileName).name}-${dateString}${path.parse(htmlFileName).ext}`;
    const newFilePath = path.join(distDir, newFileName);

    fs.writeFileSync(newFilePath, htmlContent, 'utf8');
    console.log(`✅ Файл успешно сохранен как: ${newFileName}`);

    console.log(`\n5/5. Удаляю временную папку "${path.basename(buildDir)}"...`);
    fs.rmSync(buildDir, { recursive: true, force: true });
    console.log(`✅ Папка "${path.basename(buildDir)}" успешно удалена.`);


} catch (error) {
    console.error('\n❌ Произошла ошибка в процессе выполнения скрипта:');
    console.error(error.message);
    process.exit(1);
}

console.log('\n--- Процесс сборки успешно завершен! ---');
