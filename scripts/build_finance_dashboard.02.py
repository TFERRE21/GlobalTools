for row in sample:s.append(row)
for r in range(3,s.max_row+1):s.cell(r,1).number_format=df;s.cell(r,8).number_format=cur
table(s,f"A2:K{s.max_row}","TransactionsTable");s.freeze_panes="A3";widths(s,11)
for typ,col in [("Income,Expense,Transfer","E"),("Paid,Pending,Cancelled","F"),("Yes,No","J")]:
 v=DataValidation(type="list",formula1='"'+typ+'"');s.add_data_validation(v);v.add(f"{col}3:{col}1000")
# Budget
s=wb.create_sheet("Budget");title(s,"Budget Planner","Set targets and compare actual results.");h=["Month","Revenue Budget","Expense Budget","Profit Budget","Actual Revenue","Actual Expense","Actual Profit","Revenue Variance","Expense Variance","Profit Variance"];s.append([]);s.append(h);head(s,2,10)
for i in range(12):
 r=3+i;s.cell(r,1,date(2026,1+i,1));s.cell(r,1).number_format=mf;s.cell(r,2,15000);s.cell(r,3,9000);s.cell(r,4,f"=B{r}-C{r}");s.cell(r,5,f'=SUMIFS(Transactions!$H:$H,Transactions!$A:$A,">="&A{r},Transactions!$A:$A,"<"&EDATE(A{r},1),Transactions!$E:$E,"Income",Transactions!$F:$F,"<>Cancelled")');s.cell(r,6,f'=SUMIFS(Transactions!$H:$H,Transactions!$A:$A,">="&A{r},Transactions!$A:$A,"<"&EDATE(A{r},1),Transactions!$E:$E,"Expense",Transactions!$F:$F,"<>Cancelled")');s.cell(r,7,f"=E{r}-F{r}");s.cell(r,8,f"=E{r}-B{r}");s.cell(r,9,f"=F{r}-C{r}");s.cell(r,10,f"=G{r}-D{r}")
 for c in range(2,11):s.cell(r,c).number_format=cur
table(s,"A2:J14","BudgetTable");widths(s,10)
# Monthly Summary
s=wb.create_sheet("Monthly Summary");title(s,"Monthly Financial Summary","Revenue, expenses, profit, margin, budget variance and cumulative profit.");h=["Month","Revenue","Expenses","Net Profit","Net Margin","Revenue Budget","Expense Budget","Profit Budget","Revenue Var.","Expense Var.","Profit Var.","Cumulative Profit"];s.append([]);s.append(h);head(s,2,12)
for i in range(12):
 r=3+i;s.cell(r,1,date(2026,1+i,1));s.cell(r,1).number_format=mf;s.cell(r,2,f"=Budget!E{r}");s.cell(r,3,f"=Budget!F{r}");s.cell(r,4,f"=B{r}-C{r}");s.cell(r,5,f"=IFERROR(D{r}/B{r},0)");s.cell(r,6,f"=Budget!B{r}");s.cell(r,7,f"=Budget!C{r}");s.cell(r,8,f"=Budget!D{r}");s.cell(r,9,f"=B{r}-F{r}");s.cell(r,10,f"=C{r}-G{r}");s.cell(r,11,f"=D{r}-H{r}");s.cell(r,12,f"=SUM($D$3:D{r})")
 for c in [2,3,4,6,7,8,9,10,11,12]:s.cell(r,c).number_format=cur
 s.cell(r,5).number_format=pct
table(s,"A2:L14","MonthlySummaryTable");widths(s,12)
# Receivables
s=wb.create_sheet("Receivables");title(s,"Accounts Receivable","Track invoices, collections and aging.");h=["Invoice","Customer","Issue Date","Due Date","Amount","Paid","Balance","Status","Days Overdue","Notes"];s.append([]);s.append(h);head(s,2,10)
for i,row in enumerate([("INV-1005","Acme Consulting",date(2026,3,1),date(2026,3,31),1800,0,"Open"),("INV-1006","Northstar Studio",date(2026,3,5),date(2026,3,20),1200,600,"Partial"),("INV-1007","BrightPath LLC",date(2026,3,10),date(2026,4,10),3000,0,"Open"),("INV-1008","Greenline Retail",date(2026,3,12),date(2026,3,25),750,750,"Paid")],3):
 for c,v in enumerate(row,1):s.cell(i,c,v)
 s.cell(i,7,f"=E{i}-F{i}");s.cell(i,9,f'=IF(OR(G{i}=0,H{i}="Paid"),0,MAX(0,TODAY()-D{i}))')
 for c in [3,4]:s.cell(i,c).number_format=df
 for c in [5,6,7]:s.cell(i,c).number_format=cur
table(s,"A2:J6","ReceivablesTable");widths(s,10)
# Payables
s=wb.create_sheet("Payables");title(s,"Accounts Payable","Track supplier bills and upcoming obligations.");h=["Bill","Vendor","Issue Date","Due Date","Amount","Paid","Balance","Status","Days Overdue","Priority"];s.append([]);s.append(h);head(s,2,10)
for i,row in enumerate([("BILL-3001","Cloud Software",date(2026,3,1),date(2026,3,15),99,99,"Paid","Normal"),("BILL-3002","Ad Platform",date(2026,3,5),date(2026,3,18),450,0,"Open","High"),("BILL-3003","Accountant",date(2026,3,10),date(2026,3,30),600,0,"Open","Medium"),("BILL-3004","Office Supplier",date(2026,3,12),date(2026,4,5),320,0,"Open","Normal")],3):
 for c,v in enumerate(row,1):s.cell(i,c,v)
 s.cell(i,7,f"=E{i}-F{i}");s.cell(i,9,f'=IF(OR(G{i}=0,H{i}="Paid"),0,MAX(0,TODAY()-D{i}))')
 for c in [3,4]:s.cell(i,c).number_format=df
 for c in [5,6,7]:s.cell(i,c).number_format=cur
table(s,"A2:J6","PayablesTable");widths(s,10)
# P&L
s=wb.create_sheet("P&L Statement");title(s,"Profit & Loss Statement","Management P&L derived from Transactions.");h=["Line Item","Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec","YTD"];s.append([]);s.append(h);head(s,2,14)
for rr,(label,typ) in enumerate([("Revenue","Income"),("Operating Expenses","Expense"),("Net Profit","")],3):
 s.cell(rr,1,label)
 for m in range(1,13):
  c=m+1;L=__import__('openpyxl').utils.get_column_letter(c)
  if typ: f=f'=SUMIFS(Transactions!$H:$H,Transactions!$A:$A,">="&DATE(2026,{m},1),Transactions!$A:$A,"<"&EDATE(DATE(2026,{m},1),1),Transactions!$E:$E,"{typ}",Transactions!$F:$F,"<>Cancelled")'
  else:f=f'={L}3-{L}4'
  s.cell(rr,c,f).number_format=cur
 s.cell(rr,14,f"=SUM(B{rr}:M{rr})").number_format=cur
s["A7"]="Net Margin";s["A7"].font=Font(bold=True)
for c in range(2,15):L=__import__('openpyxl').utils.get_column_letter(c);s.cell(7,c,f'=IFERROR({L}5/{L}3,0)').number_format=pct
widths(s,14)
# Cash Flow & Forecast
s=wb.create_sheet("Cash Flow & Forecast");title(s,"Cash Flow & Forecast","Daily cash visibility and 90-day forward projection.");h=["Date","Opening Cash","Actual Inflows","Actual Outflows","Net Actual","Scheduled AR","Scheduled AP","Projected Net","Projected Closing Cash","Reserve Gap"];s.append([]);s.append(h);head(s,2,10)
for i in range(91):
 r=3+i;s.cell(r,1,"=Settings!$B$11" if i==0 else f"=A{r-1}+1");s.cell(r,1).number_format=df;s.cell(r,2,"=SUM(Accounts!$D$3:$D$100)" if i==0 else f"=I{r-1}");s.cell(r,3,f'=SUMIFS(Transactions!$H:$H,Transactions!$A:$A,A{r},Transactions!$E:$E,"Income",Transactions!$F:$F,"<>Cancelled")');s.cell(r,4,f'=SUMIFS(Transactions!$H:$H,Transactions!$A:$A,A{r},Transactions!$E:$E,"Expense",Transactions!$F:$F,"<>Cancelled")');s.cell(r,5,f"=C{r}-D{r}");s.cell(r,6,f'=SUMIFS(Receivables!$G:$G,Receivables!$D:$D,A{r},Receivables!$H:$H,"<>Paid")');s.cell(r,7,f'=SUMIFS(Payables!$G:$G,Payables!$D:$D,A{r},Payables!$H:$H,"<>Paid")');s.cell(r,8,f'=F{r}-G{r}+(AVERAGE(\'Monthly Summary\'!$D$3:$D$14)/30)');s.cell(r,9,f"=B{r}+H{r}");s.cell(r,10,f"=MAX(0,Settings!$B$12-I{r})")
 for c in range(2,11):s.cell(r,c).number_format=cur
table(s,"A2:J93","CashForecastTable");s.freeze_panes="A3";widths(s,10)
s["L4"]="Forecast KPIs";
