using System;
namespace Calculator
{
    enum TokenType { none,number,delimeter};
    class TParser 
    {
        private string expression;
        private int char_index;
        private string Token="";
        private TokenType tok_type=TokenType.none;
        protected void eval_exp1(ref double value)
        {
            eval_exp2(ref value);
        }
        protected void eval_exp2(ref double value)
        {
            double t=0;
            char op = '0';

            eval_exp3(ref value);

            if (Token.Length > 0) op = Token[0];

            while ((op == '+') || (op == '-'))
            {
                get_token();
                
                eval_exp3(ref t);
                switch (op)
                {
                    case '-': value = value - t; break;
                    case '+': value = value + t; break;
                }
                if (Token.Length > 0) op = Token[0];
            }

        }
        protected void eval_exp3(ref double value)
        {
            double temp=0;
            eval_exp4(ref value);
            char op = '0';

            if (Token.Length > 0) op = Token[0];

            while ((op == '*')|| (op == '/') || (op == '%'))
            {
                get_token();
                
                eval_exp4(ref temp);
                switch (op)
                {
                    case '*': value = value * temp; break;
                    case '/': value = value / temp; break;
                    case '%': value = (int)value % (int)temp; break;
                }

                if (Token.Length > 0) op = Token[0];
            }
        }
        protected void eval_exp4(ref double value)
        {
            double temp=0, ex=0;
            eval_exp5(ref value);
            char op = '0';
            if (Token.Length>0) op=Token[0];

            if (op == '^')
            {
                get_token();
                eval_exp4(ref temp);
                ex = value;
                if (temp == 0) { value = 1; return; }
                for (int t = (int)temp - 1; t > 0; --t)
                    value = value * (double)ex;
            }
        }
        protected void eval_exp5(ref double value)
        {
            char op = '0';

            if ((tok_type == TokenType.delimeter) && (Token == "+" || Token == "-"))
            {
                if (Token.Length>0) op = Token[0];
                get_token();
            }
            eval_exp6(ref value);
            if (op == '-') value = -value;
        }
        protected void eval_exp6(ref double value)
        {
            if (Token == "(")
            {
                get_token();
                eval_exp2(ref value);
                if (Token != ")") serror(1);
                get_token();
            }
            else
                atom(ref value);
        }
        protected void atom(ref double value)
        {
            switch (tok_type)
            {
                case TokenType.number:value=double.Parse(Token); get_token();break;
                default:serror(0);break;
            }
        }
        protected void get_token()
        {
            int i = char_index;
            this.tok_type = TokenType.none;
            if (char_index>=expression.Length) { return; };

            char_index = i;Token = "";

            if (is_delim(expression[i]))
            {
                this.tok_type = TokenType.delimeter;
                this.Token = expression.Substring(i,1);
                i++;            
            }else
                if(is_digit(expression[i]))
            {
                while ((i < expression.Length) && is_digit(expression[i])) { Token = Token + expression[i];i++; };
                tok_type = TokenType.number;
            }

            char_index = i;
        }
        protected void serror(int value)
        {

        }
        protected bool is_contains(char c,string s)
        {
            return s.Contains(c);
        }
        protected bool is_space(char c)
        {
            return c == ' ';
        }
        protected bool is_delim(Char c)
        {
            return "+-*/()".Contains(c);
        }
        protected bool is_digit(Char c)
        {
            return "0987654321.".Contains(c);
        }
        public double eval_exp(string expression)
        {
            double Result=0;
            char_index = 0;
            this.expression = expression.Replace(" ","");
            get_token();
            eval_exp1(ref Result);
            if (Token.Length == 0) return 0;
            return Result;

        }
    };
}
