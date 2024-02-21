import { describe,expect,test} from "@jest/globals";
const {Builder ,By} = require('selenium-webdriver');

async function example() {

    let driver = await new Builder()
    // .setChromeOptions() // headless 설정 => 그래픽 UI가 아닌 곳에서 실행할 때, chrome창을 띄우지 않는다.
    .forBrowser('chrome')
    .build();
    await driver.get('https://nid.naver.com/nidlogin.login?mode=form&url=https://www.naver.com/');

    //성공 케이스

    const input_id = await driver.findElement(By.id('id'));
    input_id.sendKeys('');
    const input_pw = await driver.findElement(By.id('pw'));
    input_pw.sendKeys('');
    const login_btn = await driver.findElement(By.id('log.login'));
    login_btn.click();
    return true;
    //실패 케이스
}

describe("회원가입",()=>{

    const a =1,b=2;
    test("성공 케이스", async ()=>{
        expect(await example()).toEqual(true);
    });
    test("로그린 성공 케이스", ()=>{
        expect(a+b).toEqual(3);
    });
});