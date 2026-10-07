s["L4"].font=Font(size=14,bold=True,color=navy)
for r,label,formula,fmt in [(5,"Starting Cash","=B3",cur),(6,"90-Day Ending Cash","=I93",cur),(7,"Lowest Cash","=MIN(I3:I93)",cur),(8,"Lowest Cash Date","=INDEX(A3:A93,MATCH(M7,I3:I93,0))",df),(9,"Reserve Target","=Settings!B12",cur),(10,"Days Below Reserve",'=COUNTIF(I3:I93,"<"&Settings!B12)',"0")]:s[f"L{r}"]=label;s[f"M{r}"]=formula;s[f"M{r}"].number_format=fmt
chart=LineChart();chart.title="90-Day Projected Closing Cash";chart.y_axis.title="Cash";chart.x_axis.title="Date";chart.add_data(Reference(s,min_col=9,min_row=2,max_row=93),titles_from_data=True);chart.set_categories(Reference(s,min_col=1,min_row=3,max_row=93));chart.height=8;chart.width=15;s.add_chart(chart,"L13")
# Goals
s=wb.create_sheet("Goals & KPIs");title(s,"Goals & KPIs","Track revenue, margin, reserve, collections and profit targets.");h=["Goal","Target","Actual","Progress","Status","Action / Owner"];s.append([]);s.append(h);head(s,2,6)
for i,(goal,target,actual) in enumerate([("Monthly Revenue","=Settings!B9",'=SUMIFS(Transactions!$H:$H,Transactions!$E:$E,"Income",Transactions!$F:$F,"<>Cancelled")'),("Net Margin","=Settings!B10",'=IFERROR((SUMIFS(Transactions!$H:$H,Transactions!$E:$E,"Income")-SUMIFS(Transactions!$H:$H,Transactions!$E:$E,"Expense"))/SUMIFS(Transactions!$H:$H,Transactions!$E:$E,"Income"),0)'),("Cash Reserve","=Settings!B12","=SUM(Accounts!D3:D100)"),("Receivables Collected","=SUM(Receivables!E3:E100)","=SUM(Receivables!F3:F100)"),("Budget Profit","=SUM(Budget!D3:D14)","=SUM(\'Monthly Summary\'!D3:D14)")],3):
 s.cell(i,1,goal);s.cell(i,2,target);s.cell(i,3,actual);s.cell(i,4,f'=MIN(1,IFERROR(C{i}/B{i},0))');s.cell(i,5,f'=IF(D{i}>=1,"On Track",IF(D{i}>=0.75,"Watch","Needs Attention"))');s.cell(i,6,"Review weekly");s.cell(i,4).number_format=pct
 if goal=="Net Margin":s.cell(i,2).number_format=s.cell(i,3).number_format=pct
 else:s.cell(i,2).number_format=s.cell(i,3).number_format=cur
table(s,"A2:F7","GoalsTable");widths(s,6)
# Health
s=wb.create_sheet("Financial Health");title(s,"Financial Health Score","Management scorecard for profitability, liquidity, collections and forecast risk.");h=["Indicator","Target / Healthy Range","Actual","Score","Status","Why it matters"];s.append([]);s.append(h);head(s,2,6)
items=[("Net Margin",">= 20%","=IFERROR('Monthly Summary'!D14/'Monthly Summary'!B14,0)",'=MIN(100,MAX(0,C3/Settings!B10*100))',"Profitability"),("Expense Ratio","<= 80%","=IFERROR('Monthly Summary'!C14/'Monthly Summary'!B14,0)",'=MIN(100,MAX(0,(1-C4)/0.2*100))',"Cost control"),("Cash Reserve","Cash >= target","=SUM(Accounts!D3:D100)",'=MIN(100,IFERROR(C5/Settings!B12*100,0))',"Liquidity"),("Receivables Outstanding","Lower is better","=SUM(Receivables!G3:G100)",'=MAX(0,100-MIN(100,C6/Settings!B12*100))',"Collections"),("Payables Outstanding","Manage obligations","=SUM(Payables!G3:G100)",'=MAX(0,100-MIN(100,C7/Settings!B12*100))',"Obligations"),("Revenue vs Budget",">= 100%","=IFERROR(SUM('Monthly Summary'!B3:B14)/SUM('Monthly Summary'!F3:F14),0)",'=MIN(100,C8*100)',"Growth"),("Profit vs Budget",">= 100%","=IFERROR(SUM('Monthly Summary'!D3:D14)/SUM('Monthly Summary'!H3:H14),0)",'=MIN(100,C9*100)',"Execution"),("Cash Forecast","No days below reserve","=COUNTIF('Cash Flow & Forecast'!I3:I93,"<"&Settings!B12)",'=MAX(0,100-C10*5)',"Forward risk")]
for i,(a,b,c,d,e) in enumerate(items,3):s.cell(i,1,a);s.cell(i,2,b);s.cell(i,3,c);s.cell(i,4,d);s.cell(i,5,f'=IF(D{i}>=80,"Healthy",IF(D{i}>=60,"Watch","Risk"))');s.cell(i,6,e);s.cell(i,4).number_format="0"
for r in [3,4,8,9]:s.cell(r,3).number_format=pct
for r in [5,6,7]:s.cell(r,3).number_format=cur
s["A13"]="Overall Financial Health Score";s["A13"].font=Font(size=16,bold=True,color=navy);s["B13"]="=ROUND(AVERAGE(D3:D10),0)";s["B13"].font=Font(size=24,bold=True,color=blue);s["C13"]='=IF(B13>=80,"HEALTHY",IF(B13>=60,"WATCH","ACTION REQUIRED"))';s["C13"].font=Font(size=14,bold=True)
s["A15"]="Interpretation";s["B15"]="80–100 Healthy | 60–79 Watch | Below 60 Action Required";s.merge_cells("B15:F15");widths(s,6)
# Dashboard
s=wb["Dashboard"];title(s,"GlobalTools Finance Dashboard PRO","Executive financial view with cash forecast, goals and health indicators.")
for cell,label,formula,fmt,color in [("B4","Revenue YTD",'=SUMIFS(Transactions!$H:$H,Transactions!$E:$E,"Income",Transactions!$F:$F,"<>Cancelled")',cur,green),("D4","Expenses YTD",'=SUMIFS(Transactions!$H:$H,Transactions!$E:$E,"Expense",Transactions!$F:$F,"<>Cancelled")',cur,red),("F4","Net Profit","=B5-D5",cur,blue),("H4","Net Margin","=IFERROR(F5/B5,0)",pct,orange)]:
 c=s[cell].column;r=s[cell].row;s.cell(r,c,label);s.cell(r,c).font=Font(bold=True,color=white);s.cell(r,c).fill=PatternFill("solid",fgColor=color);s.merge_cells(start_row=r,start_column=c,end_row=r,end_column=c+1);s.cell(r+1,c,formula);s.cell(r+1,c).font=Font(size=16,bold=True,color=dark);s.cell(r+1,c).number_format=fmt;s.merge_cells(start_row=r+1,start_column=c,end_row=r+1,end_column=c+1)
s["B8"]="Cash Balance";s["C8"]="=SUM(Accounts!D3:D100)";s["C8"].number_format=cur;s["D8"]="90-Day Ending Cash";s["E8"]="='Cash Flow & Forecast'!M6";s["E8"].number_format=cur;s["F8"]="Health Score";s["G8"]="='Financial Health'!B13";s["G8"].number_format="0"
s["B11"]="PRO modules";s["B11"].font=Font(size=14,bold=True,color=navy)
for c,(a,b) in enumerate([("Cash Flow","Daily + 90-day forecast"),("Goals & KPIs","Targets and progress"),("Financial Health","Risk scorecard")],2):s.cell(12,c,a).font=Font(bold=True,color=blue);s.cell(13,c,b).font=Font(size=9,color=gray)
s["B16"]="Monthly Performance";s["B16"].font=Font(size=14,bold=True,color=navy)
for c,h in enumerate(["Month","Revenue","Expenses","Profit","Margin"],2):s.cell(17,c,h)
head(s,17,6)
for i in range(12):
 r=18+i;s.cell(r,2,f"='Monthly Summary'!A{3+i}");s.cell(r,2).number_format=mf;s.cell(r,3,f"='Monthly Summary'!B{3+i}");s.cell(r,4,f"='Monthly Summary'!C{3+i}");s.cell(r,5,f"='Monthly Summary'!D{3+i}");s.cell(r,6,f"='Monthly Summary'!E{3+i}");s.cell(r,3).number_format=s.cell(r,4).number_format=s.cell(r,5).number_format=cur;s.cell(r,6).number_format=pct
bar=BarChart();bar.type="col";bar.title="Revenue vs Expenses";bar.add_data(Reference(s,min_col=3,max_col=4,min_row=17,max_row=29),titles_from_data=True);bar.set_categories(Reference(s,min_col=2,min_row=18,max_row=29));bar.height=7;bar.width=13;s.add_chart(bar,"H16")
for sh in wb.worksheets:
 sh.sheet_view.showGridLines=False
 for row in sh.iter_rows():
  for x in row:
   if x.value is not None:x.alignment=Alignment(vertical="center",wrap_text=True)
 sh.sheet_properties.pageSetUpPr.fitToPage=True;sh.page_setup.fitToWidth=1;sh.page_setup.fitToHeight=0
wb.properties.title="GlobalTools Small Business Finance Dashboard PRO";wb.properties.creator="GlobalTools";wb.properties.subject="Professional small business finance management workbook"
wb.save(OUT);print(OUT)
