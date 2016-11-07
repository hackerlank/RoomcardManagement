/**
 * Lang
 * @Author Ace.c
 * @Create 2016-11-01 10:21
 */
class Lang {


    static getText(id: any, ...params): string {
        var text: string = "";

        if (id) {
            switch (core.language) {
                case Language.ch:
                    text = Lang_CH[id.toString()];
                    break;
                case Language.en:
                    text = Lang_EN[id.toString()];
                    break;
            }

            // StringUtils.
        }
        return text;
    }
}